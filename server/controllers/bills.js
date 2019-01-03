const pick = require("lodash/pick");
const mapValues = require("lodash/mapValues");

// TODO: DOC
module.exports = async ctx => {
  const rangeQueries = pick(ctx.query, [
    "createdAt",
    "amount",
    "summary",
    "balance"
  ]);

  const regexQueries = pick(ctx.query, ["desc"]);

  // fully equal
  const equalConditions = pick(ctx.query, [
    "_id",
    "account",
    "transferTo",
    "category",
    "subCategory",
    "transactionType",
    "agent"
  ]);

  // range
  const rangeConditions = mapValues(rangeQueries, str => {
    const obj = JSON.parse(str);
    const rangeQ = {};
    if (obj.max) rangeQ.$lte = obj.max;
    if (obj.min) rangeQ.$gte = obj.min;
    return rangeQ;
  });

  // partly match
  const regexConditions = mapValues(regexQueries, str => {
    return { $regex: new RegExp(str) };
  });

  const query = {
    table: "bills",
    ...equalConditions,
    ...rangeConditions,
    ...regexConditions
  };

  const results = await ctx.nedb
    .cfind(query)
    .sort({ createdAt: 1 })
    .exec();
  ctx.body = { results };
};
