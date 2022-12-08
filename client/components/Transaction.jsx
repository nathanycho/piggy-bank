import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Transaction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateDisplay = new Date(this.props.transaction.date.replace(/-/g, '\/').replace(/T.+/, '')).toLocaleDateString('en-us', options);
    return (
      <main className="transaction">
        <div className="transactionInfo" id="date">{dateDisplay}</div>
        <div className="transactionInfo" id="subject">{this.props.transaction.subject}</div>
        <div className="transactionInfo" id="type">{this.props.transaction.type}</div>
        <div className="transactionInfo" id="category">{this.props.transaction.category}</div>
        <div className="transactionInfo" id="amount">$ {this.props.transaction.amount}</div>
        <div className="transactionInfo" id="notes">{this.props.transaction.notes}</div>
        <div className="transactionButtons">
          <button className="updateButton" onClick={() => this.props.update(this.props.transaction._id)}>Update</button>
          <button className="deleteButton" onClick={() => this.props.delete(this.props.transaction._id)}>Delete</button>
        </div>
      </main>
    )
  }
}

export default Transaction;