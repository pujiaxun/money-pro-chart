const Router = require("koa-router");
const api = new Router();

api
  .get("/helloworld", async ctx => {
    console.log("helloworld");
    const data = await ctx.nedb.find({ transactionType: "支出" });
    ctx.body = { data };
  })
  .get("/byeworld", async ctx => {
    ctx.body = { data: "bye!" };
  });

module.exports = api;
