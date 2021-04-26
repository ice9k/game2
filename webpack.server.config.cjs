const getConfig = require('startupjs/bundler.cjs').webpackServerConfig

module.exports = getConfig(undefined, {
  forceCompileModules: [
    '@startupjs/auth/server',
    '@startupjs/auth-local/server',
    '@startupjs/auth/isomorphic',
    '@dmapper/chat',
    '@dmapper/rich-text-editor',
    '@dmapper/time-sync',
  ],
  alias: {}
})
