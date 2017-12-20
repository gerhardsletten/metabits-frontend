const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('about', '/om')
routes.add('page', '/:slug/:childslug?', 'index')
