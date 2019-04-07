import React from "react";

export default class MenuItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  click(e) {
    const { onClick, isPressed } = this.props;
    this.props.setState({ isPressed: !isPressed });
  }

  render() {
    const { isPressed, children, ...others } = this.props;
    return (
      <div
        className={`menu__item ${isPressed ? "selected" : ""}`}
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
