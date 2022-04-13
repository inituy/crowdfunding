import React from 'react';

class InformationBox extends React.Component {
  render() {
    return (
      <div className="informationBox">
        <div>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}

export default InformationBox;
