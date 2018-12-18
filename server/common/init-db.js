const parseDate = originDate => {
  // 2018年1月1日 12:20:20
  const re = /^(\d+)年(\d+)月(\d+)日\s*(\d+):(\d+):(\d+)$/;

  const formattedDate = originDate.replace(re, "$1-$2-$3 $4:$5:$6");
  // TODO: 注意时区问题
  return new Date(formattedDate);
};

const parseAmount = originAmount => {
  // ¥2,345.23 OR (¥2,345.23)
  const re = /^(\()?\D?([,\d\.]+)\)?$/;
  const result = re.exec(originAmount);

  if (result === null) return null;

  const amount = parseFloat(result[2].replace(/,/g, ""));
  return result[1] ? -amount : amount;
};

const parseCategory = originCate => {
  return originCate.split(": ")[0] || "";
};

const parseSubCategory = originCate => {
  return originCate.split(": ")[1] || "";
};

const processData = bill => {
  return {
    createdAt: parseDate(bill["日期"]),
    amount: parseAmount(bill["款额"]),
    account: bill["账户"],
    summary: parseAmount(bill["总额"]),
    transferTo: bill["转账到"],
    balance: parseAmount(bill["结余"]),
    category: parseCategory(bill["类别"]),
    subCategory: parseSubCategory(bill["类别"]),
    desc: bill["说明"],
    transactionType: bill["交易类型"],
    agent: bill["代理人"]
  };
};

// DEMO UTF-8
const csvTool = require("csvtojson");
const path = require("path");
const filename = path.resolve(__dirname, "../seeds/bills.csv");
const NEDB = require("nedb-promise");

module.exports = {
  initDB: async () => {
    const objs = await csvTool().fromFile(filename);

    console.log("正在导入CSV数据...");
    const startTime = new Date();
    const bills = objs.map(obj => processData(obj));
    const nedb = new NEDB();
    await nedb.insert(bills);

    console.log("导入数据成功!", "耗时", (new Date() - startTime) / 1000, "秒");
    return nedb;
  }
};
