import React, { Component } from "react";
import "./App.css";
import MoviesComponenet from "./components/movies/movies-component";
import Menu from "./components/menu/menu-component";
import LoginSignupComponent from "./components/login/login-signup-component";
import UsersDialog from "./components/dialogs/user/users-dialog-component";
import MovieTitle from "./components/dialogs/movie/movie-title-component";
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

  removeDialog(e) {
    if (e.target.classList.contains("dialog__")) {
      this.setState({ dialog: null });
    }
  }

  addUser(email, password, re_password) {
    var self = this;
    axios
      .post("http://localhost:8080/users/add", { email, password, re_password })
      .then(({ data }) => {
        const { email, password } = data.message;
        this.doLogin(email, password);
      })
      .catch(({ response }) => {
        self.setState({ ...this.state, error: response.data.message });
      });
  }

  doLogin(email, password) {
    this.setState({ ...this.state, loader: true });
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
        this.setState({ ...this.state, loader: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  renderDialogs() {
    const { dialog, movie } = this.state;
    switch (dialog) {
      case "users":
        return (
          <UsersDialog
            setState={this.setAppState.bind(this)}
            userId={this.state._id}
            token={this.state.token}
            appState={this.state}
            onClick={this.removeDialog.bind(this)}
          />
        );
        break;
      case "movieTitle":
        return (
          <MovieTitle
            setState={this.setAppState.bind(this)}
            movie={movie}
            onClick={this.removeDialog.bind(this)}
          />
        );
        break;
    }
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
          appState={this.state}
        />
        {this.state.token ? (
          <MoviesComponenet
            {...this.state}
            setState={this.setAppState.bind(this)}
          />
        ) : (
          <LoginSignupComponent
            doLogin={this.doLogin.bind(this)}
            register={this.addUser.bind(this)}
            appState={this.state}
          />
        )}
        <div class={`loader  ${this.state.loader ? "visible" : "invisible"}`} />
        {this.renderDialogs()}
      </div>
    );
  }
}

export default App;
