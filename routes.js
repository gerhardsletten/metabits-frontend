const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()
const config = require('./config')

routes.add('services', config.servicePath)
routes.add('portfolios', config.portfolioPath)
routes.add('technologies', config.techPath)
routes.add('page', '/:slug/:childslug?')
routes.add('index', '/', 'index')
