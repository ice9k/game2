import React, { useState } from 'react'
import { observer, useQuery, useSession } from 'startupjs'
import { Div, Span, Pagination } from '@startupjs/ui'
import moment from 'moment-timezone'
import { GameHistory } from 'components'

export default observer(function PPastGames () {
  const limit = 10
  const [skip, setSkip] = useState(0)
  const [user] = useSession('user')
  const userId = user.id

  const query = {
    $or: [
      { userId },
      { userIds: userId }
    ],
    finished: true
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
  return pug`
    Div
      Span Past games
      each game in games
        Div
          Span= game.name
          Span= 'Created at: ' + moment(game.createdAt).format('DD MM YYYY, HH:mm')
          Span= 'Started at: ' + moment(game.startedAt).format('DD MM YYYY, HH:mm')
          Span= 'Finished at: ' + moment(game.finishedAt).format('DD MM YYYY, HH:mm')
          GameHistory(gameId=game.id)
      Pagination(
        count=gamesCount
        limit=limit
        skip=skip
        onChangePage=val => setSkip(val * limit)
      )
  `
})
