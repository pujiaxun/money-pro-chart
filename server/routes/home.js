const Router = require("koa-router");
const home = new Router();

home.get("/", async ctx => {
  ctx.body = "Hello world!";
});

module.exports = home;
