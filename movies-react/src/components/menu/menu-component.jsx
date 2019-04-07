import React from "react";
import "./menu-component.css";
import MenuItem from "./menu-item-component";

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mouseOut = this.mouseOut.bind(this);
    this.mouseOver = this.mouseOver.bind(this);

    this.state = {
      isMouseOver: false,
      show_favorites: false
    };
  }
  mouseOver() {
    this.setState({ isMouseOver: true });
  }

  renderIcon() {
    return (
      <span className="menu__icon" onMouseEnter={this.mouseOver}>
        ☰
      </span>
    );
  }

  toggleFavorites(e) {
    this.setState({
      ...this.state,
      show_favorites: !this.state.show_favorites
    });

    this.props.setState({ show_favorites: !this.state.show_favorites });
  }

  showUsers() {
    this.props.setState({ dialog: "users" });
  }

  logOut() {
    this.props.logOut();
    this.props.setState({ token: "" });
  }

  componentDidMount() {
    this.state.show_favorites = this.props.show_favorites;
  }

  mouseOut(e) {
    this.setState({ ...this.state, isMouseOver: false });
  }

  renderMenu() {
    const { show_favorites } = this.state;
    const { appState } = this.props;
    return (
      <div className="menu__hovered">
        <text>menu</text>
        <MenuItem
          isPressed={show_favorites}
          onClick={this.toggleFavorites.bind(this)}
        >
          Favorites
        </MenuItem>
        {appState.permissions === "admin" ? (
          <MenuItem isPressed={false} onClick={this.showUsers.bind(this)}>
            Users
          </MenuItem>
        ) : null}
        <MenuItem isPressed={false} onClick={this.logOut.bind(this)}>
          Log out
        </MenuItem>
      </div>
    );
  }

  render() {
    return this.props.visible ? (
      <div className="menu__floater" onMouseLeave={this.mouseOut}>
        {this.state.isMouseOver ? this.renderMenu() : this.renderIcon()}
      </div>
    ) : null;
  }
}
