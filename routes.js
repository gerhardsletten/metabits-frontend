const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('services', '/tjenester')
routes.add('service', '/tjenester/:slug')
routes.add('page', '/:slug/:childslug?')
routes.add('index', '/', 'index')
