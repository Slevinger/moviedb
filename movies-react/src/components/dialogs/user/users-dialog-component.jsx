import React from "react";
import "./users-dialog-component.css";
import UserListing from "./user-listing-component";
import axios from "axios";

export default class UsersDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userlist: []
    };
  }

  removeUser(user_id) {
    axios
      .post("http://localhost:8080/users/remove", { user_id })
      .then(({ data }) => {
        const userlist = this.state.userlist.filter(obj => obj._id !== user_id);
        this.setState({ ...this.state, userlist });
      });
    console.log(user_id);
  }
  removeDialog(e) {
    if (!e.target.classList.contains("user__listing")) {
      this.props.setState({ dialog: null });
    }
  }

  getUsers(){
    const p = const { token } = this.props;
    const user_id = this.props.userId;
    axios
      .post("http://localhost:8080/users/get", { user_id, token });
    return p;
  }

  componentDidMount() {
      this.getUsers().then(({ data }) => {
        this.setState({ ...this.state, userlist: data.message });
      });
  }
  render() {
    return (
      <div className="users__dialog" onClick={this.removeDialog.bind(this)}>
        {this.state.userlist.map(user => (
          <UserListing
            {...user}
            removeUserCallback={this.removeUser.bind(this)}
          />
        ))}
      </div>
    );
  }
}
