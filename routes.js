const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('test-1', '/test-1')
routes.add('test-2', '/test-2')
routes.add('test-3', '/test-3')
routes.add('test-4', '/test-4')
routes.add('page', '/:slug/:childslug?', 'index')
