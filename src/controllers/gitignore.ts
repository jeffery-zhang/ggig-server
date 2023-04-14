import * as fs from 'fs'

import * as services from '../services'

import type { Context } from 'koa'
import { HttpException } from '../services/httpException'

export const allTemplates = async (ctx: Context) => {
  const dirExists = fs.existsSync('./templates')
  const fileExists = fs.existsSync('./templates/all.txt')

  let ls = ''

  if (!fileExists) {
    try {
      console.log('request github api for gitignore available templates')
      const result: string = await services.getTemplate()
      ls = result.replace(/[\[\]"]/g, '').replace(/,/g, ', ')
      if (!dirExists) fs.mkdirSync('./templates')
      fs.writeFileSync('./templates/all.txt', ls)
    } catch(err) {
      if (err instanceof HttpException) {
        ctx.status = err.code
        ctx.body = err.message
      } else {
        ctx.status = 500
        ctx.body = 'Server Error'
      }
    }
  } else {
    ls = fs.readFileSync('./templates/all.txt', 'utf-8')
  }

  ctx.body = ls
}

export const getTemplate = async (ctx: Context) => {
  const { type } = ctx.params
  const dirExists = fs.existsSync('./templates')
  const fileExists = fs.existsSync(`./templates/${type}.txt`)

  let content = ''

  if(!fileExists) {
    try {
      console.log(`request github api for gitignore ${type} templates`)
      const result: string = await services.getTemplate(type)
      content = result
      if (!dirExists) fs.mkdirSync('./templates')
      fs.writeFileSync(`./templates/${type}.txt`, content)
    } catch (err: any) {
      if (err instanceof HttpException) {
        ctx.status = err.code
        ctx.body = err.message
      } else {
        ctx.status = 500
        ctx.body = 'Server Error'
      }
    }
  } else {
    content = fs.readFileSync(`./templates/${type}.txt`, 'utf-8')
  }

  ctx.body = content
}
