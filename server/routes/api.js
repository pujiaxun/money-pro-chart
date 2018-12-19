const Router = require("koa-router");
const api = new Router();
const _ = require("lodash");

api
  .get("/enums", async ctx => {
    const { field } = ctx.query;

    const datas = await ctx.nedb.find({}, { [field]: 1 });
    const res = _.compact(_.uniq(datas.map(data => data[field])));
    ctx.body = { res };
  })
  .get("/byeworld", async ctx => {
    ctx.body = { data: "bye!" };
  });

module.exports = api;
