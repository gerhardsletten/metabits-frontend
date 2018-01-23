module.exports = {
  wpApi: process.env.DB_API || 'http://localhost:3310',
  servicePath : process.env.SERVICE_PATH || '/tjenester',
  portfolioPath : process.env.PORTFOLIO_PATH || '/referanser',
  techPath: process.env.TECH_PATH || '/teknologier'
}
