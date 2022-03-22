module.exports = function createCreatePostViewmodel(model) {
  var vm = {};

  vm.subscribers = [];
  vm.posts = [];
  vm.title = '';
  vm.content = '';

  vm.reloadPosts = function () {
    model.getPosts().then(function (results) {
      vm.posts = results;
      vm.notifyAll();
    });
  };

  vm.getPosts = function () {
    return vm.posts;
  };

  vm.setTitle = function (title) { vm.title = title; };
  vm.setContent = function (content) { vm.content = content; };
  vm.setAuthor = function (author) { vm.author = author };

  vm.createPost = function () {
    model.createPost({
      title: vm.title,
      content: vm.content,
      author: vm.author,
    })
      .then(function (response) {
        vm.posts.push(response.post);
        vm.notifyAll();
      });
  };

  /* */

  vm.subscribe = function (observer) {
    vm.subscribers.push(observer);
    vm.notify(observer);
  };

  vm.notifyAll = function () {
    vm.subscribers.forEach(vm.notify);
  };

  vm.notify = function (observer) {
    observer(vm);
  };

  return vm;
};
