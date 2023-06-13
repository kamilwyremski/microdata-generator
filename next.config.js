const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  publicExcludes : ['404.html'],
  buildExcludes  : ['_error'],
  sw: 'sw.js',
})

module.exports = withPWA()