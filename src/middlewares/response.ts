import type { Context } from 'koa'

interface ResponseData {
  success: boolean
  message?: string
  data?: any
  code: number
}

export default async function response(ctx: Context, next: () => Promise<any>) {
  await next()
  
  const body: any = ctx.body

  const data: ResponseData = { success: true, code: ctx.status }

  if (body instanceof Error) {
    data.success = false
    data.message = body.message
  } else if (ctx.status === 404) {
    data.success = false
    data.message = 'Not Found'
  } else if (ctx.status === 401) {
    data.success = false
    data.message = 'Unauthorized'
  } else if (ctx.status === 500) {
    data.success = false
    data.message = 'Internal Server Error'
  } else {
    data.data = body
  }
  
  ctx.body = data
}