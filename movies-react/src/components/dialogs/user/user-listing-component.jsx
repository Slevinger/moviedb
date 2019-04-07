import React from "react";

export default class UserListing extends React.PureComponent {
  deleteUser() {
    const user_id = this.props._id;
    const { removeUserCallback } = this.props;
    removeUserCallback(user_id);
    console.log(this.props);
  }

  render() {
    return (
      <div className="user__listing">
        <text>{this.props.email}</text>
        <div
          className="delete__user__btn"
          onClick={this.deleteUser.bind(this)}
          title="Remove user"
        >
          ✗
        </div>
      </div>
    );
  }
}
