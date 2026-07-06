import React, { useState } from "react";
import { addTransaction } from "../services/api";


export default function TransactionForm({ onSuccess }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    try {
      await addTransaction({
        type,
        amount: Number(amount),
        description,
      });

      setAmount("");
      setDescription("");
      setType("income");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      alert("Unable to add transaction.");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        Add Transaction
      </button>

    </form>
  );
}