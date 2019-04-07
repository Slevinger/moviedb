import React from "react";
import axios from "axios";

import "./login-signup-component.css";

export default class LoginSignupComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);
    this.renderComponenet = this.renderComponenet.bind(this);
    this.renderToggle = this.renderToggle.bind(this);

    this.state = {
      screen: "start" // start | login | signup
    };
  }

  goBack() {
    this.setState({ screen: "none" });
  }

  buttonClicked(e) {
    let screen = e.target.id;
    this.setState({ ...this.state, screen });
  }

  getValueFromInput(cssQuery) {
    let dom = document.querySelector(cssQuery);
    if (dom && dom.nodeName == "INPUT" && dom.value) {
      return dom.value;
    }
    return null;
  }

  doLogin() {
    const email = this.getValueFromInput("#email__");
    const password = this.getValueFromInput("#password__");
    const re_password = this.getValueFromInput("#password__r");
    const { doLogin, register } = this.props;
    const map = { login: doLogin, signup: register };
    try {
      this.setState({ ...this.state, errorMessage: "" });
      map[this.state.screen](email, password, re_password);
    } catch (errorMessage) {
      this.setState({ ...this.state, errorMessage });
    }
    // const email = this.getValueFromInput();
  }

  renderComponenet() {
    const { screen } = this.state;
    const { error } = this.props.appState;
    return (
      <div className="login-wrapper">
        <span className="error__message">{error}</span>
        <input
          class="txt__login__form"
          id="email__"
          type="text"
          placeholder="e-mail"
        />
        <input
          class="txt__login__form"
          id="password__"
          type="password"
          placeholder="password"
        />
        {screen === "signup" ? (
          <input
            class="txt__login__form"
            id="password__r"
            type="password"
            placeholder="retype password"
          />
        ) : null}
        <div className="form__btns">
          <div className="form__btn" onClick={this.doLogin.bind(this)}>
            {this.state.screen}
          </div>
          <div className="form__btn" onClick={this.goBack.bind(this)}>
            Back
          </div>
        </div>
      </div>
    );
  }

  renderToggle() {
    return (
      <div className="login-wrapper">
        <div
          className="form__btn"
          id="login"
          onClick={this.buttonClicked.bind(this)}
        >
          Login
        </div>
        <div
          className="form__btn"
          id="signup"
          onClick={this.buttonClicked.bind(this)}
        >
          SignUp
        </div>
      </div>
    );
  }
  render() {
    const { screen } = this.state;
    return screen === "signup" || screen === "login"
      ? this.renderComponenet()
      : this.renderToggle();
  }
}
