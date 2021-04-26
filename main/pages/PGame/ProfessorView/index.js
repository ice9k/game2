import React, { useMemo } from 'react'
import { ScrollView } from 'react-native'
import { observer, useLocal, useDoc, $root, useQuery, useQueryIds } from 'startupjs'
import { Div, Button, Span, Row } from '@startupjs/ui'
import _ from 'lodash'
import { GameHistory } from 'components'

export default observer(function ProfessorsView () {
  const [gameId] = useLocal('$render.params.id')
  const [game, $game] = useDoc('games', gameId)
  const { rounds } = game
  const [users] = useQueryIds('users',
    game.userIds
  )
  const roundId = rounds[rounds.length - 1]
  const [currentRound, $currentRound] = useDoc('rounds', roundId)
  const previousRoundId = rounds[rounds.length - 2]
  const [previousRound] = useDoc('rounds', previousRoundId)
  const [groups] = useQuery('groups', {
    gameId
  })

  const onNextRoundPress = async () => {
    $currentRound.set('finished', true)
    if (game.roundCount === game.rounds.length) {
      $game.setEach({ finished: true, finishedAt: Date.now() })
    } else {
      const roundId = $root.id()
      await $root.add('rounds', {
        gameId,
        id: roundId,
        roundIndex: game.rounds.length
      })
      await $game.push('rounds', roundId)
    }
  }

  async function formGroups () {
    const { usersByRoles } = game
    const lengths = Object.values(usersByRoles).map(arr => arr.length)
    const length = Math.min(...lengths)
    const slicedArrays = {}
    Object.keys(usersByRoles).forEach(role => {
      slicedArrays[role] = usersByRoles[role].slice(0, length)
    })
    const promises = []
    let allUsers = []
    for (let i = 0; i < length; i++) {
      let chatId = $root.id()
      let group = { userIds: [], gameId, id: $root.id(), chatId }
      Object.keys(slicedArrays).forEach(role => {
        const userId = slicedArrays[role][i]
        group[userId] = role
        group.userIds.push(userId)
        allUsers.push(userId)
      })
      promises.push($root.add('groups', group))
      promises.push($root.scope('chats').addNew('group', { id: chatId, scope: 'group', userIds: group.userIds }))
    }
    promises.push($game.del('nextPlayerRoleIndex'))
    promises.push($game.set('userIds', allUsers))
    await Promise.all(promises)
    await $game.set('startedAt', Date.now())
    await $game.del('usersByRoles')
  }

  const usersMemo = useMemo(() => {
    let userObj = {}
    users.forEach(user => { userObj[user.id] = user })
    return userObj
  }, [JSON.stringify(users)])

  return pug`
    ScrollView.root
      if !groups.length
        Button(
          onPress=formGroups
        ) Form groups
      else
        GameHistory(gameId=gameId)
        if game.finished
          Span Game finished
        else 
          Span= 'Round' + rounds.length
          Button(onPress=onNextRoundPress)= game.roundCount === game.rounds.length? 'Finish game' : 'Next round'
      if groups.length
        each group, index in groups
          Span= 'Group ' + index+1
          each userId in group.userIds
            Row
              Div
                Span= usersMemo[userId].firstName
                Span= 'Answer: ' + _.get(currentRound, userId+'.answer', 'No answer')
                Span= _.get(currentRound, userId+'.roundPoints', 0) + ' points earned'
                Span= _.get(previousRound, userId+'.totalPoints', 0) + _.get(currentRound, userId+'.roundPoints', 0) +' total points'

  `
})
