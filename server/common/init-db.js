const csvTool = require("csvtojson");
const path = require("path");
const filename = path.resolve(__dirname, "../seeds/bills.csv");
const NEDB = require("nedb-promise");
const { initDatas } = require("./bill-parser");

module.exports = {
  initDB: async () => {
    // TODO: support UTF-16
    const objs = await csvTool().fromFile(filename);

    console.log("Importing CSV datas...");
    const startTime = new Date();
    const nedb = new NEDB();

    const datas = initDatas(objs);
    await nedb.insert(datas);

    console.log(
      "Initialize database success!",
      "Cost",
      (new Date() - startTime) / 1000,
      "seconds"
    );
    return nedb;
  }
};
