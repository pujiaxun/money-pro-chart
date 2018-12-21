const csvTool = require("csvtojson");
const path = require("path");
const filename = path.resolve(__dirname, "../seeds/bills.csv");
const NEDB = require("nedb-promise");
const { initDatas } = require("./bill-parser");

module.exports = {
  initDB: async () => {
    const objs = await csvTool().fromFile(filename);

    console.log("正在导入CSV数据...");
    const startTime = new Date();
    const nedb = new NEDB();

    const datas = initDatas(objs);
    await nedb.insert(datas);

    console.log("导入数据成功!", "耗时", (new Date() - startTime) / 1000, "秒");
    return nedb;
  }
};
