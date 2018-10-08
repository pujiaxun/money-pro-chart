import Router from "koa-router"
const home = new Router();

home.get("/", async ctx => {
  let html = `
    <a href="/public/index.html">Home Page</a>
  `;
  ctx.body = html;
});

export default home;
