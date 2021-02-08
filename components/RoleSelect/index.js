import React from 'react'
import { observer, useSession } from 'startupjs'
import { AuthForm as SAuthForm } from '@startupjs/auth'
import { Row, Button, Span, Content } from '@startupjs/ui'
import * as localForms from '@startupjs/auth-local'
import './index.styl'

function AuthForm () {
  const [baseUrl] = useSession('baseUrl')
  const [, $user] = useSession('user')

  return pug`
    Content.root
      Span Please select your role
      Row.buttons
        Button(onPress=() => $user.set('role', 'student')) Student
        Button(pushed onPress=() => $user.set('role', 'professor')) Professor
  `
}

export default observer(AuthForm)