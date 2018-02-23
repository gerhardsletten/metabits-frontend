const express = require('express')
const next = require('next')
const path = require('path')
const compression = require('compression')
const LRUCache = require('lru-cache')
const proxy = require('http-proxy-middleware')
const routes = require('./routes')
const config = require('./config')

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = dev ? routes.getRequestHandler(app) : routes.getRequestHandler(app, renderAndCache)

const server = express()
server.use(compression())
server.use('/graphql', proxy({
  target: config.wpApi,
  changeOrigin: true
}))
server.use(`/${config.a3BucketPath}/`, proxy({
  target: `http://${config.s3BucketHost}/`,
  changeOrigin: true,
  pathRewrite: {[`^/${config.a3BucketPath}`]: ''},
  headers: {
    'Host': config.s3BucketHost,
    'Authorization': ''
  }
}))
app.prepare().then(() => {
  server.get('/service-worker.js', (req, res) =>
    app.serveStatic(req, res, path.resolve('./.next/service-worker.js'))
  )
  server.get('/sw-inital-request.js', (req, res) =>
    app.serveStatic(req, res, path.resolve('./static/sw-inital-request.js'))
  )
  server.get('/manifest.json', (req, res) =>
    app.serveStatic(req, res, path.resolve('./static/manifest.json'))
  )
  server.use(handler)
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port} (${dev ? 'dev' : 'prod'})`)
  })
})

/* SSR cache */

function getCacheKey (req) {
  return `${req.url}`
}

function renderAndCache ({req, res, route, query}) {
  const key = getCacheKey(req)
  // app.render(req, res, route.page, query)
  // If we have a page in the cache, let's serve it
  if (!dev && ssrCache.has(key)) {
    res.send(ssrCache.get(key))
    return
  }

  // If not let's render the page into HTML
  app.renderToHTML(req, res, route.page, query)
    .then((html) => {
      if (!dev) {
        ssrCache.set(key, html)
      }
      res.send(html)
    })
    .catch((err) => {
      app.renderError(req, res, route.page, query)
    })
}
