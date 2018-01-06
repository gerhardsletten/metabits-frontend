const express = require('express')
const next = require('next')
const compression = require('compression')
const proxy = require('http-proxy-middleware')
const routes = require('./routes')
const config = require('./config')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

const server = express()
server.use(compression())
server.use('/graphql', proxy({
  target: config.wpApi,
  changeOrigin: true,
  logLevel: 'debug'
}))
app.prepare()
.then(() => {
  server.use(handler)
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
