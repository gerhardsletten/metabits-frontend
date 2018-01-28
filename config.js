module.exports = {
  wpApi: process.env.DB_API || 'http://localhost:3310',
  servicePath : process.env.SERVICE_PATH || '/tjenester',
  portfolioPath : process.env.PORTFOLIO_PATH || '/referanser',
  techPath: process.env.TECH_PATH || '/teknologier',
  favicon: 'https://s3.eu-central-1.amazonaws.com/metabits-static/layout/favicon.ico',
  logo: 'https://s3.eu-central-1.amazonaws.com/metabits-static/layout/logo-metabits-plain.svg'
}
