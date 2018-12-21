const Router = require("koa-router");
const api = new Router();

api
  .get("/enums", async ctx => {
    const { field } = ctx.query;

    const datas = await ctx.nedb.find({ table: "enums", type: field });
    ctx.body = { datas };
  })
  .get("/byeworld", async ctx => {
    ctx.body = { data: "bye!" };
  });

module.exports = api;
