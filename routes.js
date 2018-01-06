const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('page', '/:slug/:childslug?', 'page')
routes.add('index', '/', 'index')
