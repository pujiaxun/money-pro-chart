const pick = require("lodash/pick");
const mapValues = require("lodash/mapValues");

// TODO: DOC
module.exports = async ctx => {
  const equalConditions = pick(ctx.query, [
    "_id",
    "account",
    "transferTo",
    "category",
    "subCategory",
    "transactionType",
    "agent"
  ]);

  const rangeQueries = pick(ctx.query, [
    "createdAt",
    "amount",
    "summary",
    "balance"
  ]);

  const regexQueries = pick(ctx.query, ["desc"]);

  const rangeConditions = mapValues(rangeQueries, str => {
    const obj = JSON.parse(str);
    const rangeQ = {};
    if (obj.max) rangeQ.$lte = obj.max;
    if (obj.min) rangeQ.$gte = obj.min;
    return rangeQ;
  });

  const regexConditions = mapValues(regexQueries, str => {
    return { $regex: new RegExp(str) };
  });

  const query = {
    table: "bills",
    ...equalConditions,
    ...rangeConditions,
    ...regexConditions
  };

  const results = await ctx.nedb.find(query);
  ctx.body = { results };
};
