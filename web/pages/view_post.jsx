var React = require('react');

class ViewPostPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div>
      <p>Esta es la view</p>
      <a href="#create-post">IR create</a>
    </div>
  }
}

module.exports = ViewPostPage;
