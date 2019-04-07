import React, { Component } from "react";
import "./App.css";
import MoviesComponenet from "./components/movies/movies-component";
import Menu from "./components/menu/menu-component";
import LoginSignupComponent from "./components/login/login-signup-component";
import UsersDialog from "./components/dialogs/users-dialog-component";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.doLogin = this.doLogin.bind(this);

    this.state = {
      email: "",
      token: null,
      dialog: null
    };
  }

  doLogin(email, password) {
    axios
      .post("http://localhost:8080/users/login", { email, password })
      .then(res => {
        const {
          email,
          favorites,
          permissions,
          password,
          token,
          _id
        } = res.data.message;

        this.setState({
          ...this.state,
          email,
          favorites,
          permissions,
          password,
          token,
          _id
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  setAppState(obj) {
    this.setState({ ...this.state, ...obj });
  }

  render() {
    return (
      <div className="App">
        <Menu
          visible={!!this.state.token}
          setState={this.setAppState.bind(this)}
        />
        {this.state.token ? (
          <MoviesComponenet {...this.state} />
        ) : (
          <LoginSignupComponent
            doLogin={this.doLogin.bind(this)}
            appState={this.state}
          />
        )}
        {this.state.dialog && this.state.dialog == "users" ? (
          <UsersDialog
            setState={this.setAppState.bind(this)}
            userId={this.state._id}
            token={this.state.token}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
