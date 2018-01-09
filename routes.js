const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()
const config = require('./config')

routes.add('services', config.servicePath)
routes.add('service', `${config.servicePath}/:slug`)
routes.add('page', '/:slug/:childslug?')
routes.add('index', '/', 'index')
