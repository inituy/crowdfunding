describe('createCreatePostViemwodel', function () {
  var createCreatePostViemwodel = require('../../create_post');
  var viewmodel;

  // TODO: Esto tiene que ir en un archivo mas prolijo.
  var model = {
    getPosts: function () {
      model.getPosts.results = model.getPosts.results || [];
      model.getPosts.promises = model.getPosts.promises || [];
      var results = [
        { _id: Math.random(), title: Math.random() },
        { _id: Math.random(), title: Math.random() },
        { _id: Math.random(), title: Math.random() }
      ];
      var promise = new Promise(function (ok) {
        var fn = function () { ok(results); };
        setTimeout(fn, 10);
      });
      model.getPosts.results.push(results);
      model.getPosts.promises.push(promise);
      return promise;
    },
    createPost: function (params) {
      model.createPost.params = params;
      model.createPost.result = { post: Math.random() };
      model.createPost.promise = new Promise(function (ok) {
        setTimeout(function () { ok(model.createPost.result) }, 10);
      });
      return model.createPost.promise;
    }
  };

  beforeEach(function () {
    viewmodel = createCreatePostViemwodel(model);
  })

  it('user creates a post', function (done) {
    var title = Math.random()
      , content = Math.random();
    Promise.resolve()
      // NOTE: La experiencia empieza por el usuario cargando los posts que
      // ya existen y teniendo acceso a ellos a traves de viewmodel.getPosts.
      .then(function () {
        viewmodel.reloadPosts();
        return model.getPosts.promises[0];
      })
      .then(function () {
        var posts = viewmodel.getPosts();
        expect(posts).not.toBeUndefined();
        expect(posts).toBe(model.getPosts.results[0]);
      })
      // NOTE: Luego el usuario llena el formulario y se envia la informacion
      // al servidor.
      .then(function () {
        viewmodel.setTitle(title);
        viewmodel.setContent(content);
        viewmodel.createPost();
        expect(model.createPost.params).toEqual({
          title: title,
          content: content,
        });
        return model.createPost.promise;
      })
      .then(function () {
        var posts = viewmodel.getPosts();
        var lastPost = posts[posts.length - 1];
        expect(lastPost).toBe(model.createPost.result.post);
      })
      .then(done);
  });
});
