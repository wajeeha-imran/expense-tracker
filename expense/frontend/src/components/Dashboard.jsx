import React, { useEffect, useState } from "react";

import {getTransactions,getBalance,} from "../services/api";

import TransactionForm from "./TransactionForm"; 
import TransactionHistory from "./TransactionHistory";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const loadData = async () => {
    try {
      const transactionData = await getTransactions();
      const balanceData = await getBalance();

      setTransactions(transactionData);
      setBalance(balanceData.balance);

      let totalIncome = 0;
      let totalExpense = 0;

      transactionData.forEach((item) => {
        if (item.type === "income") {
          totalIncome += Number(item.amount);
        } else {
          totalExpense += Number(item.amount);
        }
      });

      setIncome(totalIncome);
      setExpense(totalExpense);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard">

      <h1 className="title">
        💰 Expense Tracker
      </h1>

      <div className="summary">

        <div className="card balance-card">
          <h3>Current Balance</h3>
          <h2>Rs. {balance}</h2>
        </div>

        <div className="card income-card">
          <h3>Total Income</h3>
          <h2>Rs. {income}</h2>
        </div>

        <div className="card expense-card">
          <h3>Total Expense</h3>
          <h2>Rs. {expense}</h2>
        </div>

      </div>

      <TransactionForm onSuccess={loadData} />

      <div className="history-header">

        <h2>Transaction History</h2>

        <button
          className="history-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All History"}
        </button>

      </div>

      <TransactionHistory
        transactions={
          showAll
            ? transactions
            : transactions.slice(0, 5)
        }
        refresh={loadData}
      />

    </div>
  );
}