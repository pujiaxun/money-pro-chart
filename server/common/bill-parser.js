const _ = require("lodash");
const CONST_STRING = require("./constant");

const parseDate = originDate => {
  // SAMPLE: "2018年1月1日 12:20:20"
  const re = /^(\d+)年(\d+)月(\d+)日\s*(\d+):(\d+):(\d+)$/;

  const formattedDate = originDate.replace(re, "$1-$2-$3 $4:$5:$6");
  // * 注意时区问题
  return new Date(formattedDate);
};

const parseAmount = originAmount => {
  // SAMPLE: "¥2,345.23" OR "(¥2,345.23)"
  const re = /^(\()?\D?([,\d.]+)\)?$/;
  const result = re.exec(originAmount);

  if (result === null) return null;

  const amount = parseFloat(result[2].replace(/,/g, ""));
  return result[1] ? -amount : amount;
};

const parseCategory = originCate => {
  // SAMPLE: "交通: 高铁火车 交通: 高铁火车 "
  const delimiter = "|DELIMITER|";
  const formatted = originCate.trim().replace(": ", delimiter);
  const cates = formatted.split(" ");

  // * 无法识别多笔订单的类别各自金额，所以暂时取第一个
  return cates[0].split(delimiter);
};

const billParser = bill => {
  return {
    table: CONST_STRING.BILL_TABLE_NAME,
    createdAt: parseDate(bill[CONST_STRING.CREATED_AT]),
    amount: parseAmount(bill[CONST_STRING.AMOUNT]),
    account: bill[CONST_STRING.ACCOUNT],
    summary: parseAmount(bill[CONST_STRING.SUMMARY]),
    transferTo: bill[CONST_STRING.TRANSFER_TO],
    balance: parseAmount(bill[CONST_STRING.BALANCE]),
    category: parseCategory(bill[CONST_STRING.CATEGORY])[0],
    subCategory: parseCategory(bill[CONST_STRING.CATEGORY])[1],
    desc: bill[CONST_STRING.DESC],
    transactionType: bill[CONST_STRING.TRANSACTION_TYPE],
    agent: bill[CONST_STRING.AGENT]
  };
};

const initBills = objs => {
  return objs.map(obj => billParser(obj));
};

const enumParser = (objs, type) => {
  return _.compact(_.uniq(objs.map(obj => obj[type]))).map(val => ({
    table: CONST_STRING.ENUM_TABLE_NAME,
    type,
    val
  }));
};

const initEnums = bills => {
  const enumsList = ["account", "category", "subCategory", "transactionType"];
  return enumsList.map(field => enumParser(bills, field));
};

const initDatas = objs => {
  const bills = initBills(objs);
  const enums = initEnums(bills);
  return [].concat(bills).concat(enums);
};

module.exports = {
  initDatas
};
