const Koa = require("koa");
const router = require("./routes");
const cors = require("@koa/cors");
const { initDB } = require("./common/init-db");

const run = async () => {
  const app = new Koa();
  const SERVER_PORT = 3456;

  // CORS
  const corsConfig = {
    origin: "*",
    allowMethods: ["GET", "POST", "OPTION"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Access-Control-Allow-Origin"
    ]
  };
  app.use(cors(corsConfig));

  // 初始化nedb
  const nedb = await initDB();
  app.use(async (ctx, next) => {
    ctx.nedb = nedb;
    await next();
  });

  // 加载路由中间件
  app.use(router.routes()).use(router.allowedMethods());

  app.listen(SERVER_PORT, () => {
    console.log(
      `[Money Pro Chart] Koa server is running on the port ${SERVER_PORT}!`
    );
  });
};

run();
