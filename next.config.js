const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    publicExcludes : ['404.html'],
    buildExcludes  : ['_error']
  }
})