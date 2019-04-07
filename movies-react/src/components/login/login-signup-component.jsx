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
    const { doLogin } = this.props;

    doLogin(email, password);
    // const email = this.getValueFromInput();
  }

  renderComponenet() {
    const { screen } = this.state;

    return (
      <div className="login-wrapper">
        <input
          class="txt__login__form"
          id="email__"
          type="text"
          value="test"
          placeholder="e-mail"
        />
        <input
          class="txt__login__form"
          id="password__"
          type="password"
          value="12345678"
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
            Login
          </div>
          <div className="form__btn" onClick={this.goBack}>
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
