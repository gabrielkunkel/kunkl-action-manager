import React, { Component } from "../../node_modules/react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { Nav } from "./Nav";

class App extends Component {
  state = {
    data: [],
  };

  componentDidMount() {

  }

  componentDidUpdate() { 

  }

  componentWillUnmount() {

  }

  render() {
   
   
    return (
      <div>
        <Nav />
        <div className="body">
         <Route path="/" exact component={Home} />
         <Route path="/profile" component={Profile} />
         </div>
      </div>
    );
  }
}

export default App;
