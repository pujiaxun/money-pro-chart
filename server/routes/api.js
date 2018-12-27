const Router = require("koa-router");
const api = new Router();

const enumsController = require("../controllers/enums");
const billsController = require("../controllers/bills");

api.get("/enums", enumsController);
api.get("/bills", billsController);

module.exports = api;
