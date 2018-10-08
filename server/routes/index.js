import Router from "koa-router"
import home from './home'
import api from './api'

const router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

export default router;
