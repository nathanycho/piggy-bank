import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <main className="dashboard">
        <div className="navbar">
          <a className="sidebarLink" id="dashboardLink" href="/dashboard">Dashboard</a>
          <a className="sidebarLink" id="inputLink" href="/input">Input</a>
        </div>
        <section className="right">
          <img src="https://www.adobe.com/express/create/chart/pie/media_1f78d811bae5e3b9cc9057d342e2a8541a493525d.png?width=750&format=png&optimize=medium" alt="Chart Placeholder"></img>
        </section>
      </main>
    )
  }
}

export default Dashboard;