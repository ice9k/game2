import React, { useState, useMemo } from 'react'
import { observer, useDoc, useQuery, useQueryIds } from 'startupjs'
import { Div, Span, Collapse, Pagination, Row } from '@startupjs/ui'
import _ from 'lodash'

export default observer(function GameHistory ({ gameId }) {
  const limit = 10
  const [game] = useDoc('games', gameId)
  const [users = []] = useQueryIds('users',
    game.userIds
  )
  const [groups = []] = useQuery('groups', {
    gameId
  })
  const [open, setOpen] = useState(false)
  const [skip, setSkip] = useState(0)
  const [rounds] = useQuery('rounds', {
    gameId,
    finished: true,
    $sort: { roundIndex: 1 },
    $skip: skip,
    $limit: limit
  })

  const [roundsCount] = useQuery('rounds', {
    gameId,
    $count: true,
    finished: true
  })

  const usersMemo = useMemo(() => {
    let userObj = {}
    users.forEach(user => { userObj[user.id] = user })
    return userObj
  }, [JSON.stringify(users)])

  return pug`
    Collapse(
      title= 'Game history'
      open=open
      onChange=() => setOpen(!open)
    )
      each round in rounds
        Div(key=round.roundIndex)
          Span= 'Round ' + (round.roundIndex+1)
          each group, index in groups
            Span= 'Group ' + index+1
            each userId in group.userIds
              Row
                Div
                  Span= usersMemo[userId].firstName
                  Span= 'Answer: ' + _.get(round, userId+'.answer', 'No answer')
                  Span= _.get(round, userId+'.totalPoints', 0) + ' points earned'
                  Span= _.get(round, userId+'.totalPoints', 0) + ' total points'
      Pagination(
        count=roundsCount
        limit=limit
        skip=skip
        onChangePage=val => setSkip(val * limit)
      )
  `
})
