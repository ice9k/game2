const getConfig = require('startupjs/bundler.cjs').webpackWebConfig

module.exports = getConfig(undefined, {
  forceCompileModules: [
    '@startupjs/auth', 
    '@startupjs/auth-local', 
    '@dmapper/chat',
    '@dmapper/rich-text-editor',
    '@dmapper/time-sync',
  ],
  alias: {},
  mode: 'react-native'
})
