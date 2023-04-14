import Router from 'koa-router'
import * as controllers from '../controllers'

const router = new Router()

router.prefix('/api')

router.get('/gitignore/templates', controllers.allTemplates)

router.get('/gitignore/templates/:type', controllers.getTemplate)

export default router
