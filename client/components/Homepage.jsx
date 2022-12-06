import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Homepage extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <main className="homepage">
        <section className="left">
          <div></div>
          <h2></h2>
          <p></p>
        </section>
        <section className="right">
          <div className="loginBox">
            <input className="username" id="username" placeholder="Username"></input>
            <input className="password" id="password" placehoolder="Password"></input>
            <button className="loginButton" id="loginButton">Log in</button>
            <div className="login_fail" id="login_fail"></div>
            <a className="forgotPW" href="#forgot">Forgot password?</a>
          </div>
          <div className="signupBox">
            <p>Don't have an account? <a href="#signup">Sign up</a></p>
          </div>
        </section>
      </main>
    )
  }
}

export default Homepage;