import { get, RequestOptions } from 'https'
import dotenv from 'dotenv'

export interface GithubResError {
  statusCode: number
  message: string
}

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
          reject({
            statusCode: res.statusCode,
            message: 'Github Api response error',
          } as GithubResError)
        }
        resolve(data)
      })
    }
  )
  req.on('error', err => {
    console.error('Github Api request error: ', err)
  })
})