import type { Context } from 'koa'

export interface ResponseData {
  success: boolean
  message?: string
  data?: any
  code: number
}

export default async function response(ctx: Context, next: () => Promise<any>) {
  await next()
  
  const body: any = ctx.body
  const data: ResponseData = { success: false, code: ctx.status }

  if (ctx.status === 200) {
    data.success = true
    data.data = body
    ctx.body = data
  }
}