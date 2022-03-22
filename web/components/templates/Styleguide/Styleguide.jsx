import React from 'react';

/* ATOMS */

/* MOLECULES */

/* ORGANISMS */

/* TEMPLATES */





var selectedComponent = 'CarouselSelectionList';
var components = [
  /* {
    name: 'ActionButton',
    elem: <ActionButton onClick={function () {}} text="Action Button" />
  }, */
];





class Styleguide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: selectedComponent };
  }

  handleChange(selection) {
    this.setState({ selected: selection.value });
  }

  renderComponentDropdown() {
    var options = components.map(function (component) {
      return { value: component.name, label: component.name };
    });
    return <div></div>;
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
