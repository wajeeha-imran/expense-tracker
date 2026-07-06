import express from "express";
import { AppDataSource } from "../config/data-source.js";
import Transaction from "../entities/Transaction.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Transaction);

  const transactions = await repo.find({
    order: { id: "DESC" },
  });

  res.json(transactions);
});

router.post("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Transaction);

  const { type, amount, description } = req.body;

  const transaction = repo.create({
    type,
    amount,
    description,
  });

  await repo.save(transaction);

  res.json(transaction);
});

router.put("/:id", async (req, res) => {
  const repo = AppDataSource.getRepository(Transaction);

  const transaction = await repo.findOneBy({
    id: Number(req.params.id),
  });

  if (!transaction)
    return res.status(404).json({
      message: "Transaction not found",
    });

  transaction.type = req.body.type;
  transaction.amount = req.body.amount;
  transaction.description = req.body.description;

  await repo.save(transaction);

  res.json(transaction);
});

router.delete("/:id", async (req, res) => {
  const repo = AppDataSource.getRepository(Transaction);

  await repo.delete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

router.get("/balance", async (req, res) => {
  const repo = AppDataSource.getRepository(Transaction);

  const transactions = await repo.find();

  let balance = 0;

  transactions.forEach((item) => {
    if (item.type === "income") {
      balance += Number(item.amount);
    } else {
      balance -= Number(item.amount);
    }
  });

  res.json({
    balance,
  });
});

export default router;