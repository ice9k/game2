import React from 'react'
import {
  observer,
  useSession,
  emit
} from 'startupjs'
import { Div, Button } from '@startupjs/ui'
import { MainProfessor, MainPlayer } from 'components'

export default observer(function PMain ({ style }) {
  const [role] = useSession('user.role')

  return pug`
    Div
      Button(onPress=() => emit('url', '/past-games')) Past games
      if role === 'professor'
        MainProfessor
      else
        MainPlayer
  `
})
