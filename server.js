const express = require('express')
const next = require('next')
const compression = require('compression');
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

const server = express()
app.prepare()
.then(() => {
  server.use(handler)
  // server.use(compression())
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
