import * as fs from 'fs'

import * as services from '../services'

import type { Context } from 'koa'

import type { GithubResError } from '../services/reqTemplates'

export const allTemplates = async (ctx: Context) => {
  const exists = fs.existsSync('./templates/all.txt')

  let ls = ''

  if (!exists) {
    try {
      const result: string = await services.getTemplate()
      ls = result.replace(/[\[\]"]/g, '').replace(/,/g, ', ')
      fs.writeFileSync('./templates/all.txt', ls)
    } catch(err: any) {
      ctx.status = err.statusCode
      ctx.body = err.message
    }
  } else {
    ls = fs.readFileSync('./templates/all.txt', 'utf-8')
  }

  ctx.body = ls
}

export const getTemplate = async (ctx: Context) => {
  const { type } = ctx.params
  const exists = fs.existsSync(`./templates/${type}.txt`)

  let content = ''

  if(!exists) {
    try {
      const result: string = await services.getTemplate(type)
      content = result
      fs.writeFileSync(`./templates/${type}.txt`, content)
    } catch (err: any) {
      ctx.status = err.statusCode
      ctx.body = err.message
    }
  } else {
    content = fs.readFileSync(`./templates/${type}.txt`, 'utf-8')
  }

  ctx.body = content
}
