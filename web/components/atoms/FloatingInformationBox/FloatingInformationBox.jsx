import React from 'react';

class FloatingInformationBox extends React.Component {
  render() {
    return (
      <div className='floatingInformationBox'>
        <div>
          <div>
            <p>{this.props.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FloatingInformationBox;