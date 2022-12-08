import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Transaction from './Transaction';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionList: [],
    };

    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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


  update(objID) {
    axios.patch('http://localhost:3000/transactions',
      { data: { _id: objID } },
      { withCredentials: true })
      .then((res) =>
        this.setState({
          transactionList: res.data
        })
      )
      .catch((err) => console.log(err));
  }

  delete(objID) {
    axios.delete('http://localhost:3000/transactions',
      { data: { _id: objID } },
      { withCredentials: true })
      .then((res) => console.log('deleted'))
      .catch((err) => console.log(err));

    this.loadPage();
  }

  render() {
    const transactions = [];
    for (let i = 0; i < this.state.transactionList.length; i++) {
      transactions.push(<Transaction id={i} transaction={this.state.transactionList[i]} update={this.update} delete={this.delete} key={i} />)
    }

    return (
      <main className="transactionsPage">
        <Navbar />
        <section className="right">
          <div className="transactionsBox">
            {transactions}
          </div>
          <div className="inputBox">
            <form className="inputForm" method="POST" action='/transactions/input'>
              <input className="transactInput" name="date" type="date"></input>
              <input className="transactInput" name="subject" placeholder="Subject"></input>
              <input className="transactInput" name="type" placeholder="Type"></input>
              <input className="transactInput" name="category" placeholder="Category"></input>
              <input className="transactInput" name="amount" type="number" min="0" step="0.01" placeholder="Amount"></input>
              <input className="transactInput" name="notes" placeholder="Notes"></input>
              <input className="inputButton" type="submit" value="Submit"></input>
            </form>
          </div>
        </section>
      </main>
    )
  }
}

export default Transactions;