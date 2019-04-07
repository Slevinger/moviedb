import React from "react";

export default class UserListing extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  deleteUser(e) {
    const user_id = this.props._id;
    const { removeUserCallback } = this.props;
    removeUserCallback(user_id);
    e.stopPropagation();
    console.log(this.props);
  }

  mouseOut(e) {
    this.setState({ ...this.state, mouseOver: false });
  }
  mouseOver(e) {
    this.setState({ ...this.state, mouseOver: true });
  }

  render() {
    const { mouseOver } = this.state;
    console.log(this.props);
    return (
      <div className="user__listing">
        <div
          onMouseEnter={this.mouseOver.bind(this)}
          onMouseLeave={this.mouseOut.bind(this)}
        >
          <text>{this.props.email}</text>
          <div
            className="delete__user__btn"
            onClick={this.deleteUser.bind(this)}
            title="Remove user"
          >
            ✗
          </div>
        </div>
        <div class={`user__data ${mouseOver ? "display" : "hide"}`}>
          details
        </div>
      </div>
    );
  }
}
