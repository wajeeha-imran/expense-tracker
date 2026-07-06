import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Transaction",
  tableName: "transactions",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    type: {
      type: "varchar",
    },

    amount: {
      type: "decimal",
    },

    description: {
      type: "varchar",
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});