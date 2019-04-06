import React, { Component } from "react";
import "./App.css";
import MoviesComponenet from "./components/movies/movies-component";
import LoginSignupComponent from "./components/login/login-signup-component";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.doLogin = this.doLogin.bind(this);

    this.state = {
      email: "",
      token: null
    };
  }

  doLogin(email, password) {
    axios
      .post("http://localhost:8080/users/login", { email, password })
      .then(res => {
        this.setState(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.token ? (
          <MoviesComponenet />
        ) : (
          <LoginSignupComponent doLogin={this.doLogin} appState={this.state} />
        )}
      </div>
    );
  }
}

export default App;
