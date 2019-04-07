import React from "react";
import "./statistics-component.css";
export default class UserStatisticsPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    debugger;
    this.state = props.users.reduce((acc, user) => {
      acc.logged_users = acc.logged_users || 0;
      acc.logged_users += user.token ? 1 : 0;
      acc.total_users = acc.total_users || 0;
      acc.total_users += 1;
      return acc;
    }, {});
  }

  render() {
    console.log(this.props);
    return (
      <div className="statitsics__container">
        <div class="statistics__attr">
          <text className="statistics__header">Logged in users</text>
          <text className="statistics__value">{this.state.logged_users}</text>
        </div>
        <div class="statistics__attr">
          <text className="statistics__header">Total users</text>
          <text className="statistics__value">{this.state.total_users}</text>
        </div>
      </div>
    );
  }
}
