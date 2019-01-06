const Router = require("koa-router");
const api = new Router();

api.get("/enums", require("../controllers/enums"));
api.get("/bills", require("../controllers/bills"));
api.get("/categories", require("../controllers/categories"));

module.exports = api;
