import Router from "koa-router"
const api = new Router();

api
  .get("/helloworld", async ctx => {
    ctx.body = { data: "hello!" };
  })
  .get("/byeworld", async ctx => {
    ctx.body = { data: "bye!" };
  });

export default api;
