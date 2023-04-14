import { Context, Next } from 'koa'

import { HttpException } from '../services/httpException'

import type { ResponseData } from './response'

export default async function errorhandler(ctx: Context, next: Next): Promise<any> {
  try {
    await next()
  } catch (err) {
    if (err instanceof HttpException) {
      ctx.status = err.code
      ctx.body = {
        code: err.code,
        message: err.message,
        body: null,
        success: false,
      } as ResponseData
    } else {
      console.error('Uncaught error object: ', err)
      
      ctx.status = 500
      ctx.body = {
        code: ctx.status,
        message: 'Server Error',
        body: null,
        success: false,
      } as ResponseData
    }
  }
}
