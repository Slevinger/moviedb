import React, { Component } from "react";
import "./App.css";
import MoviesComponenet from "./components/movies/movies-component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MoviesComponenet />
      </div>
    );
  }
}

export default App;
