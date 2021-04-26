import React from 'react'
import { observer, useSession } from 'startupjs'
import { Row, Button, Span, Content } from '@startupjs/ui'
import './index.styl'

function RoleSelect () {
  const [, $sessionUser] = useSession('user')

  return pug`
    Content.root
      Span Please select your role
      Row.buttons
        Button(onPress=() => $sessionUser.set('role', 'student')) Student
        Button(pushed onPress=() => $sessionUser.set('role', 'professor')) Professor
  `
}

export default observer(RoleSelect)
