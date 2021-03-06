const a3BucketPath = process.env.S3_BUCKET_PATH || 'aws-bucket'

module.exports = {
  wpApi: process.env.DB_API || 'http://localhost:3310',
  servicePath: process.env.SERVICE_PATH || '/tjenester',
  portfolioPath: process.env.PORTFOLIO_PATH || '/referanser',
  techPath: process.env.TECH_PATH || '/teknologier',
  favicon: '/' + a3BucketPath + '/layout/favicon.ico',
  tagManager: process.env.TAG_MANAGER || 'GTM-5MC8TVT',
  enableTracking: process.env.ENABLE_TRACKING || true,
  enableOffline: process.env.ENABLE_OFFLINE || true,
  contentVersion: process.env.CONTENT_VERSION || 'v3',
  s3BucketHost: process.env.S3_BUCKET_HOST || 'metabits-static.s3.eu-central-1.amazonaws.com',
  a3BucketPath
}
