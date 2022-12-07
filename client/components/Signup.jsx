import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <main className="signupPage">
        <div className="signupBox">
          <form className="signupForm" method="POST" action='/signup/success'>
            <input className="username" id="username" name="username" type="text" placeholder="Username"></input>
            <input className="password" id="password" name="password" type="password" placeholder="Password"></input>
            <input className="signupButton" id="signupButton" type="submit" value="Sign Up"></input>
            <div className="signupFail" id="signupFail"></div>
          </form>
        </div>
      </main>
    )
  }
}

export default Signup;