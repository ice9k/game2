import React, { useState } from 'react'
import { observer, useLocal, useDoc, useQuery, useSession } from 'startupjs'
import { ScrollView } from 'react-native'
import { TestComponent, GameHistory } from 'components'
import './index.styl'
import moment from 'moment-timezone'
import { Content, Div, Button, Span, Collapse, Pagination, Row } from '@startupjs/ui'
import _ from 'lodash'

export default observer(function PPastGames () {
  const limit = 10
  const [skip, setSkip] = useState(0)
  const [user] = useSession('user')
  const userId = user.id

  const [games, $games] = useQuery('games', {
    $or: [
      { userId },
      { userIds: userId }
    ],
    finished: true,
    $skip: skip,
    $limit: limit
  })

  const [gamesCount] = useQuery('games', {
    $or: [
      { userId },
      { userIds: userId }
    ],
    finished: true,
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
