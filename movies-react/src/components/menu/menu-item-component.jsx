import React from "react";

export default class MenuItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  click(e) {
    const { onClick, isPressed } = this.props;
    this.setState({ ...this.state, isPressed: !isPressed });
    onClick(e);
  }

  render() {
    const { children, ...others } = this.props;
    return (
      <div
        className={`menu__item ${this.state.isPressed ? "selected" : ""}`}
        onMouseOut={e => {
          e.stopPropagation();
        }}
        onClick={this.click.bind(this)}
        {...others}
      >
        <span>★</span>
        {children}
      </div>
    );
  }
}
