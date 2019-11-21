import React, { Component } from "../../node_modules/react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { Nav } from "./Nav";
import Auth from "../Auth/Auth"

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history); // can be in state; could be instantiated in auth
  }

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
          <Route path="/" exact render={props => <Home auth={this.auth} {...props} />} />
          <Route path="/profile" component={Profile} />
         </div>
      </div>
    );
  }
}

export default App;
