import init from 'startupjs/init'
import { initAuth } from '@startupjs/auth/server'
import orm from '../model'
import startupjsServer from 'startupjs/server'
import api from './api'
import getMainRoutes from '../main/routes'
import { initApp } from 'startupjs/app/server'
import { getAuthRoutes } from '@startupjs/auth/isomorphic'
import { Strategy as LocalStrategy } from '@startupjs/auth-local/server'


// Init startupjs ORM.
init({ orm })

// Check '@startupjs/server' readme for the full API
startupjsServer({
  getHead,
  appRoutes: [
    ...getMainRoutes(),
    ...getAuthRoutes()
  ]
}, (ee, options) => {
  initApp(ee)
  initAuth(ee, {
    strategies: [
      new LocalStrategy({}),
    ]
  })
  ee.on('routes', expressApp => {
    expressApp.use('/api', api)
  })
})

function getHead (appName) {
  return `
    <title>HelloWorld</title>
    <!-- Put vendor JS and CSS here -->
  `
}

export default function run () {}
