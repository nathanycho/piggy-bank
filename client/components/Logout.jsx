import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <main className="logoutPage">
        You have been successfully logged out.<br></br>
        Redirecting you to our homepage...
      </main>
    )
  }
}

export default Logout;