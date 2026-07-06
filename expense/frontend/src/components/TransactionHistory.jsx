import React from "react";
import {
  deleteTransaction,
  updateTransaction,
} from "../services/api";

export default function TransactionHistory({
  transactions,
  refresh,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);
      refresh();
    } catch (error) {
      console.log(error);
      alert("Unable to delete transaction.");
    }
  };

  const handleEdit = async (transaction) => {
    const amount = prompt(
      "Enter New Amount",
      transaction.amount
    );

    if (amount === null) return;

    const description = prompt(
      "Enter New Description",
      transaction.description
    );

    if (description === null) return;

    try {
      await updateTransaction(transaction.id, {
        ...transaction,
        amount: Number(amount),
        description,
      });

      refresh();
    } catch (error) {
      console.log(error);
      alert("Unable to update transaction.");
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="empty-history">
        <h3>No Transactions Yet</h3>
        <p>Add your first income or expense.</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`history-card ${transaction.type}`}
        >
          <div className="history-info">
            <h3>{transaction.description}</h3>

            <p>
              {transaction.type === "income"
                ? "Income"
                : "Expense"}
            </p>
          </div>

          <div className="history-amount">
            Rs. {transaction.amount}
          </div>

          <div className="history-actions">
            <button
              className="edit-btn"
              onClick={() => handleEdit(transaction)}
            >
              ✏ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(transaction.id)
              }
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}