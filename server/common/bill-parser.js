const _ = require("lodash");
const CONST_STRING = require("./constant");

const parseDate = originDate => {
  // * SAMPLE: "Jun 25, 2018 at 21:50:52"
  // * 2018年6月25日 21:44:11
  const formattedDate = originDate
    .replace("at", " ")
    .replace("年", "/")
    .replace("月", "/")
    .replace("日", "");
  return new Date(formattedDate);
};

const parseAmount = originAmount => {
  // * SAMPLE: "¥2,345.23" OR "(¥2,345.23)"
  const re = /^(\()?\D?([,\d.]+)\)?$/;
  const result = re.exec(originAmount);

  if (result === null) return null;

  const amount = parseFloat(result[2].replace(/,/g, ""));
  return result[1] ? -amount : amount;
};

const parseCategory = originCate => {
  // * SAMPLE: "Meal: Dinner Meal: Lunch "
  const delimiter = "|DELIMITER|";
  const formatted = originCate.trim().replace(": ", delimiter);
  const cates = formatted.split(" ");

  // ! Cannot recognize their own prices in the same row from the poor csv file.
  return cates[0].split(delimiter);
};

const parseTransType = type => {
  return CONST_STRING.TRANSACTION_TYPES_MAP[type];
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
    transactionType: parseTransType(bill[CONST_STRING.TRANSACTION_TYPE]),
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
  const enumsList = [
    "account",
    "category",
    "subCategory",
    "transactionType",
    "agent"
  ];
  return enumsList.map(field => enumParser(bills, field));
};

const initCate = objs => {
  const typeCatesMap = {};
  const delimiter = "|DELIMITER|";

  objs.forEach(obj => {
    const { category: cate, subCategory: subCate, transactionType } = obj;
    if (!cate) return;
    const typeAndCate = [transactionType, cate].join(delimiter);

    if (!typeCatesMap[typeAndCate]) {
      typeCatesMap[typeAndCate] = {};
    }

    if (subCate) {
      typeCatesMap[typeAndCate][subCate] = 1;
    }
  });

  return _.map(typeCatesMap, (val, key) => {
    const [type, category] = key.split(delimiter);
    return {
      table: CONST_STRING.CATE_TABLE_NAME,
      type,
      category,
      subCategory: _.map(val, (__, k) => k)
    };
  });
};

const initDatas = objs => {
  const bills = initBills(objs);
  const enums = initEnums(bills);
  const cates = initCate(bills);

  return []
    .concat(bills)
    .concat(enums)
    .concat(cates);
};

module.exports = {
  initDatas
};
