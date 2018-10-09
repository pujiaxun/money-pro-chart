const Router = require("koa-router")
const api = new Router();

api
  .get("/helloworld", async ctx => {
    console.log('helloworld');

    ctx.body = { data: "hello!" };
  })
  .get("/byeworld", async ctx => {
    ctx.body = { data: "bye!" };
  });

module.exports = api
