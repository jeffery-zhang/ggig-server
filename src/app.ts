import Koa from 'koa'

import router from './routes'
import * as middlewares from './middlewares'

const app = new Koa()

app.use(middlewares.response)

app.use(router.routes())

app.on('error', middlewares.errorhandler)

export default app
