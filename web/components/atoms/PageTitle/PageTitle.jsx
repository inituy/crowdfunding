import React from 'react';

class PageTitle extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default PageTitle;
