var routes = {
  '': require('./pages/view_post.jsx'),
  '#view-post': require('./pages/view_post.jsx'),
};

module.exports = function router(model) {
  function renderPage(hash) {
    var page = routes[hash];
    if (!page) page = require('./pages/not_found.jsx');
    var element = require('react').createElement(page, { model: model });
    require('react-dom').render(element, document.querySelector('#root'));
  }
  function render() { renderPage(document.location.hash); }
  window.addEventListener('hashchange', render);
  render();
};
