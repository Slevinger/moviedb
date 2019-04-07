import React from "react";
import "./users-dialog-component.css";
import UserListing from "./user-listing-component";
import axios from "axios";
import UserStatisticsPanel from "./statistics-component";

export default class UsersDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  removeUser(user_id) {
    axios
      .post("http://localhost:8080/users/remove", { user_id })
      .then(({ data }) => {
        const users = this.state.users.filter(obj => obj._id !== user_id);
        this.setState({ ...this.state, users });
      });
  }

  getUsers() {
    const { token } = this.props;
    const user_id = this.props.userId;
    const p = axios.post("http://localhost:8080/users/get", { user_id, token });
    return p;
  }

  componentDidMount() {
    this.getUsers().then(({ data }) => {
      this.setState({ ...this.state, users: data.message });
    });
  }
  render() {
    const { users } = this.state;
    return (
      <div className="dialog__" onClick={this.props.onClick.bind(this)}>
        {users.length && <UserStatisticsPanel users={users} />}
        {users.map(user => (
          <UserListing
            {...user}
            removeUserCallback={this.removeUser.bind(this)}
          />
        ))}
      </div>
    );
  }
}
