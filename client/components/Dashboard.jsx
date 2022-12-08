import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import axios from 'axios';

import Navbar from './Navbar';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monthIncome: 5000,
      Need: 0.5,
      Want: 0.3,
      Save: 0.2,
      transactionList: [],
    };

    this.loadPage = this.loadPage.bind(this);
  }

  componentDidMount() {
    return this.loadPage();
  }

  loadPage() {
    axios.get('http://localhost:3000/transactions', { withCredentials: true })
      .then((res) => {
        res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return this.setState({
          transactionList: res.data
        })
      }
      )
      .catch((err) => console.log(err));
  }

  calculateBudget(type) {
    let sum = 0;
    for (const each of this.state.transactionList) {
      if (each.type === type) {
        sum += each.amount;
      }
    }

    console.log(type, sum);

    if (sum > this.state.monthIncome * this.state[type]) {
      return "OVER BUDGET";
    }

    else {
      return "Under budget"
    }
  }

  calculateCategory() {
    let maxCategory = '';
    let maxAmount = 0;
    const cache = {};
    for (const each of this.state.transactionList) {
      if (Object.hasOwn(cache, each.category)) {
        cache[each.category] += each.amount;
      }
      else {
        cache[each.category] = each.amount;
      }
      if (cache[each.category] > maxAmount) {
        maxCategory = each.category;
        maxAmount = cache[each.category];
      }
    }
    return `${maxCategory}: $${maxAmount}`;
  }

  render() {
    const need = `${this.state.Need * 100}%`
    const want = `${this.state.Want * 100}%`
    const save = `${this.state.Save * 100}%`

    return (
      <main className="dashboard">
        <Navbar />
        <section className="dashboardMain">
          <img src="https://www.adobe.com/express/create/chart/pie/media_1f78d811bae5e3b9cc9057d342e2a8541a493525d.png?width=750&format=png&optimize=medium" alt="Chart Placeholder"></img>
          <div className="summariesBox">
            <div className="infoTitle">Monthly Net Income</div>
            <div className="info">$ {this.state.monthIncome}</div>
            <hr></hr>
            <div className="infoTitle">Savings Plan</div>
            <div className="info">Need: {need}, Want: {want}, Save: {save}</div>
            <hr></hr>
            <div className="infoTitle">Summary</div>
            <div className="info">{this.calculateBudget('Need')} for Needs!</div>
            <div className="info">{this.calculateBudget('Want')} for Wants!</div>
            <hr></hr>
            <div className="infoTitle">Highest Spend Category</div>
            <div className="info">{this.calculateCategory()}</div>
          </div>
        </section>
      </main>
    )
  }
}

export default Dashboard;