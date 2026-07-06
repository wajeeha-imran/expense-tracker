const API_URL = "upbeat-insight-production-75ab.up.railway.app/api/transactions";



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
