describe('/get_campaigns', function () {
  var request = require('./support/request.js')
    , connect = require('../mongo/connect.js')
    , objectId = require('../mongo/object_id.js');

  var port = 23232
    , server
    , db;

  var adminSession
    , campaigns;

  beforeAll(function () {
    server = require('../server.js')();
    server.listen(port);
  });

  afterAll(function () {
    server.close();
  });

  beforeEach(function (done) {
    connect()
      .then(function (_) { db = _; })
      .then(function () { return db.dropDatabase(); })
      .then(function () {
        adminSession = { adminId: objectId() };
        return db.collection('adminSessions').insertOne(adminSession);
      })
      .then(function () {
        campaigns = [
          { adminId: adminSession.adminId, name: Math.random() },
          { adminId: objectId(), name: Math.random() },
          { adminId: adminSession.adminId, name: Math.random() },
          { adminId: adminSession.adminId, name: Math.random() },
        ];
        return db.collection('campaigns').insertMany(campaigns);
      })
      .then(done);
  });

  it('cant find admin session', function (done) {
    request({
      port: port,
      path: '/get_campaigns',
      body: JSON.stringify({ adminSessionId: Math.random() })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ adminSession: 'NOT_FOUND' });
        done();
      });
  });

  it('returns campaigns', function (done) {
    request({
      port: port,
      path: '/get_campaigns',
      body: JSON.stringify({ adminSessionId: adminSession._id })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({
          campaigns: [
            { _id: campaigns[0]._id.toString(),
              adminId: campaigns[0].adminId.toString(),
              name: campaigns[0].name },
            { _id: campaigns[2]._id.toString(),
              adminId: campaigns[2].adminId.toString(),
              name: campaigns[2].name },
            { _id: campaigns[3]._id.toString(),
              adminId: campaigns[3].adminId.toString(),
              name: campaigns[3].name },
          ]
        });
        done();
      });
  });
});