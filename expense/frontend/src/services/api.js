const API_URL = "http://localhost:5000/api/transactions";

/* ===========================
   GET ALL TRANSACTIONS
=========================== */

export const getTransactions = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* ===========================
   GET BALANCE
=========================== */

export const getBalance = async () => {
  try {
    const response = await fetch(`${API_URL}/balance`);

    if (!response.ok) {
      throw new Error("Failed to fetch balance");
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      balance: 0,
    };
  }
};

/* ===========================
   ADD TRANSACTION
=========================== */

export const addTransaction = async (transaction) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

/* ===========================
   UPDATE TRANSACTION
=========================== */

export const updateTransaction = async (id, transaction) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error("Failed to update transaction");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

/* ===========================
   DELETE TRANSACTION
=========================== */

export const deleteTransaction = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};