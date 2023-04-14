import dotenv from 'dotenv'

import app from './app'

dotenv.config({ path: '.env' })

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Server is now running at localhost:' + port)
})
