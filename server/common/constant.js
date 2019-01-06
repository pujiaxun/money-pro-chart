const TRANSACTION_TYPES_MAP = {
  Expense: "expense",
  Income: "income",
  "Opening Balance": "init",
  "Money Transfer": "transfer",
  "Asset Purchase": "purchase",
  "Asset Sale": "sale",
  "Liability Acquisition": "lend",
  "Discharge of Liability": "repay"
};

module.exports = {
  ENUM_TABLE_NAME: "enums",
  CATE_TABLE_NAME: "categories",

  BILL_TABLE_NAME: "bills",
  CREATED_AT: "Date",
  AMOUNT: "Amount",
  ACCOUNT: "Account",
  SUMMARY: "Amount received",
  TRANSFER_TO: "Account (to)",
  BALANCE: "Balance",
  CATEGORY: "Category",
  DESC: "Description",
  TRANSACTION_TYPE: "Transaction Type",
  AGENT: "Agent",
  TRANSACTION_TYPES_MAP
};
