import React, { useState, useEffect } from 'react'
import {
  observer,
  useValue,
  useSession,
  $root,
  useQuery,
  emit
} from 'startupjs'
import axios from 'axios'
import './index.styl'
import { MainProfessor, MainPlayer } from 'components'
import { Div, Span, Button, Br, Row, Card, Input, Checkbox, TextInput } from '@startupjs/ui'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default observer(function MainProfessor ({ style }) {
  const [sessionUser] = useSession('user')
  const [games] = useQuery('games', {
    userId: sessionUser.id,
    finished: { $ne: true }
  })
  
  const onChangeText = val => $gameName(val)
  return pug`
    each game in games
      Div(key=game.id)
        Button.btn(onPress=() => emit('url', '/game/' + game.id))= 'Join ' + game.name
  `
})

