import React, { useState } from 'react'
import {
  observer,
  useSession,
  $root,
  useQuery,
  emit
} from 'startupjs'
import { Div, Span, Button, Pagination } from '@startupjs/ui'

export default observer(function MainPlayer ({ style }) {
  const limit = 10
  const [skip, setSkip] = useState(0)
  const [sessionUser] = useSession('user')

  const query = {
    $or: [
      { usersByRoles: { $exists: true } },
      { userIds: sessionUser.id }
    ],
    finished: { $ne: true }
  }

  const [games] = useQuery('games', {
    ...query,
    $skip: skip,
    $limit: limit
  })

  const [gamesCount] = useQuery('games', {
    ...query,
    $count: true
  })

  const onJoinGame = async id => {
    const $game = $root.scope(`games.${id}`)
    await $game.joinUser(sessionUser.id)
    emit('url', `/game/${id}`)
  }

  return pug`
    Div
      Span Available games
      each game in games
        Div(key=game.id)
          Span= game.name
          Button(onPress=() => onJoinGame(game.id) ) Join
      if gamesCount
        Pagination(
          count=gamesCount
          limit=limit
          skip=skip
          onChangePage=val => setSkip(val * limit)
        )
  `
})
