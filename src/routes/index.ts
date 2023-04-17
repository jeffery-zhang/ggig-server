import Router from 'koa-router'
import * as controllers from '../controllers'
import type { Context } from 'koa'

const router = new Router()

router.prefix('/gitignore')

router.get('/', async (ctx: Context) => {
  ctx.body = '<h2>Hello Koa</h2>'
})

router.get('/templates', controllers.allTemplates)

router.get('/templates/:type', controllers.getTemplate)

export default router
