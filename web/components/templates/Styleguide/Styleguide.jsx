import React from 'react';

/* ATOMS */
import Button from '../../atoms/Button/Button.jsx';

/* MOLECULES */

/* ORGANISMS */

/* TEMPLATES */




var selectedComponent = 'Button';
var components = [
  {
    name: 'Button',
    elem: <Button onClick={console.log} text="Button" />
  },
];





class Styleguide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: selectedComponent };
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
  }

  renderComponentDropdown() {
    var options = components.map(function (component) {
      return { value: component.name, label: component.name };
    });
    return (
      <select
          defaultValue={selectedComponent}
          onChange={this.handleChange.bind(this)}>
        {components.map(function (component) {
          return (
            <option key={component.name} value={component.name}>
              {component.name}
            </option>
          );
        })}
      </select>
    );
  }

  renderComponent(component, index) {
    if (component.name != this.state.selected) return;
    return <div className="styleguide-item" key={index}>{component.elem}</div>;
  }

  render() {
    return <div className="styleguide">
      <div className="styleguide-nav">{this.renderComponentDropdown()}</div>
      <div className="styleguide-items">{components.map(this.renderComponent.bind(this))}</div>
    </div>
  }
}

export default Styleguide;
