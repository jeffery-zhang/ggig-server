import Koa from 'koa'
import cors from '@koa/cors'

import router from './routes'
import * as middlewares from './middlewares'

const app = new Koa()

app.use(cors())

app.use(middlewares.response)

app.use(router.routes())

app.on('error', middlewares.errorhandler)

export default app
