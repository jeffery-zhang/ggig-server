import Router from 'koa-router'
import * as controllers from '../controllers'

const router = new Router()

router.prefix('/api')

router.get('/templates', controllers.allTemplates)

router.get('/templates/:type', controllers.getTemplate)

export default router
