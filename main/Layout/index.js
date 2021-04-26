import React from 'react'
import { observer, emit, useValue, useLocal, useSession } from 'startupjs'
import './index.styl'
import { Row, Div, Layout, SmartSidebar, Menu, Button, H1 } from '@startupjs/ui'
import { LogoutButton } from '@startupjs/auth'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { RoleSelect } from 'components'
import APP from '../../app.json'

const { displayName } = APP

const APP_NAME = displayName.charAt(0).toUpperCase() + displayName.slice(1)

const MenuItem = observer(({ url, children }) => {
  const [currentUrl] = useLocal('$render.url')
  return pug`
    Menu.Item(
      active=currentUrl === url
      onPress=() => emit('url', url)
    )= children
  `
})

export default observer(function ({ children }) {
  const [opened, $opened] = useValue(false)
  const [loggedIn] = useSession('loggedIn')
  const [role] = useSession('user.role')

  function renderSidebar () {
    return pug`
      Menu.sidebar
        MenuItem(url='/') Games
        MenuItem(url='/past-games') Past games
        if role === 'professor'
          MenuItem(url='/library') Library
        LogoutButton
    `
  }
  if (!loggedIn) emit('url', '/auth/sign-in')

  return pug`
    if !role
      RoleSelect
    else
      Layout
        SmartSidebar.sidebar(
          path=$opened.path()
          renderContent=renderSidebar
        )
          Row.menu
            Button(color='secondaryText' icon=faBars onPress=() => $opened.set(!opened))
            H1.logo= APP_NAME

          Div.body= children
  `
})
