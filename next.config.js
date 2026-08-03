const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  sw: 'sw.js',
})

module.exports = withPWA({
  output: 'export',
})