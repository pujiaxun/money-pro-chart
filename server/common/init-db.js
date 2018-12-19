const csvTool = require("csvtojson");
const path = require("path");
const filename = path.resolve(__dirname, "../seeds/bills.csv");
const NEDB = require("nedb-promise");
const { billParser } = require("./bill-parser");

module.exports = {
  initDB: async () => {
    const objs = await csvTool().fromFile(filename);

    console.log("正在导入CSV数据...");
    const startTime = new Date();
    const bills = objs.map(obj => billParser(obj));
    const nedb = new NEDB();
    await nedb.insert(bills);

    console.log("导入数据成功!", "耗时", (new Date() - startTime) / 1000, "秒");
    return nedb;
  }
};
