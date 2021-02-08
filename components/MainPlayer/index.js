import React, { useState, useEffect } from 'react'
import {
  observer,
  useQueryDoc,
  useSession,
  $root,
  useQuery,
  emit
} from 'startupjs'
import axios from 'axios'
import './index.styl'
import { Div, Span, Button, Br, Row, Card, Input, Checkbox, TextInput, Pagination } from '@startupjs/ui'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default observer(function MainPlayer ({ style }) {
  const limit=10
  const [skip, setSkip] = useState(0)
  const [sessionUser, $sessionUser] = useSession('user')
  const [games, $games] = useQuery('games', {
    $or: [
      { usersByRoles: { $exists: true }},
      { userIds: sessionUser.id }
    ],
    finished: { $ne: true },
    $skip: skip,
    $limit: limit
  })

  const [gamesCount] = useQuery('games', {
    $or: [
      { usersByRoles: { $exists: true }},
      { userIds: sessionUser.id }
    ],
    finished: { $ne: true },
    $count: true
  })

  const onJoinGame = async id => {
    const $game = $root.scope(`games.${id}`)
    const { nextPlayerRoleIndex = 0, roles } = $game.get()
    const role = roles[nextPlayerRoleIndex]
    await $game.push('usersByRoles.' + role, sessionUser.id)
    await $game.set('nextPlayerRoleIndex', (nextPlayerRoleIndex + 1) % roles.length)
    emit('url', `/game/${id}`)
  }
  
  const onChangeText = val => $gameName(val)
  return pug`
    Div
      Span Available games
      each game in games
        Div(key=game.id)
          Span= game.name
          Button(onPress=() => onJoinGame(game.id) ) Join
      Pagination(
        count=gamesCount
        limit=limit
        skip=skip
        onChangePage=val => setSkip(val * limit)
      )
  `
})
