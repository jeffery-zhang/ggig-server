import { get, RequestOptions } from 'https'
import dotenv from 'dotenv'

import { HttpException } from './httpException'

dotenv.config({ path: '.env' })

const token = process.env.GITHUB_TOKEN

const options = (type?: string): RequestOptions => ({
  hostname: 'api.github.com',
  path: `/gitignore/templates${type ? `/${type}` : ''}`,
  headers: {
    'User-Agent': 'node',
    'Authorization': 'token ' + token,
  },
})
export const getTemplate = async (type?: string): Promise<string> => new Promise((resolve, reject) => {
  const req = get(
    options(type),
    res => {
      let data = ''
      res.on('data', chunk => {
        data += chunk
      })
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`Github Api response error:\nmes=${data}\nstatus=${res.statusCode}`)
          const err = new HttpException(res.statusCode || 500, data)
          reject(err)
        }
        resolve(data)
      })
    }
  )
  req.on('error', err => {
    console.error('Github Api request error: ', err)
    throw new HttpException(500, 'Github Api request error')
  })
})