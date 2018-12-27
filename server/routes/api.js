const Router = require("koa-router");
const api = new Router();
const pick = require("lodash/pick");
const mapValues = require("lodash/mapValues");

api
  .get("/enums", async ctx => {
    const { field } = ctx.query;

    const results = await ctx.nedb.find({ table: "enums", type: field });
    ctx.body = { results };
  })
  .get("/bills", async ctx => {
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
      if (obj.max) rangeQ.$lt = obj.max;
      if (obj.min) rangeQ.$gt = obj.min;
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
  });

module.exports = api;
