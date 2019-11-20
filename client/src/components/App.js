import React, { Component } from "react";

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
   
    const { data } = this.state;
   
    return (
      <div>
         Welcome to a React Application.
      </div>
    );
  }
}

export default App;
