const Koa = require("koa")
const router = require('./routes')

const app = new Koa();
const SERVER_PORT = 3456;

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(SERVER_PORT, () => {
  console.log(`[Money Pro Chart] Server is running on the port ${SERVER_PORT}!`);
});
