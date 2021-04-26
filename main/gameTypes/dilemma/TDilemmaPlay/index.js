import React from 'react'
import { observer, useDoc, useQueryDoc, useSession } from 'startupjs'
import { Br, Span, Row, Button } from '@startupjs/ui'
import _ from 'lodash'

export default observer(function ({ gameId }) {
  const [userId] = useSession('userId')

  const [game] = useDoc('games', gameId)
  const [group] = useQueryDoc('groups', {
    gameId,
    userIds: userId
  })

  const { rounds } = game
  const roundId = rounds[rounds.length - 1]
  const [currentRound, $currentRound] = useDoc('rounds', roundId)
  const previousRoundId = rounds[rounds.length - 2]
  const [previousRound] = useDoc('rounds', previousRoundId)

  const enemyId = group.userIds.find(id => id !== userId)

  const question = game.questions[0]

  const onButtonPress = async option => {
    const enemyPlayerAnswer = _.get(currentRound, `${enemyId}.answer`, null)
    if (enemyPlayerAnswer) {
      const string = option + enemyPlayerAnswer + 'points'
      const enemyString = enemyPlayerAnswer + option + 'points'
      const points = question[string]
      const enemyPoints = question[enemyString]

      $currentRound.setEach({
        [userId]: {
          answer: option,
          roundPoints: points,
          totalPoints: _.get(previousRound, `${userId}.totalPoints`, 0) + points
        },
        [enemyId]: {
          answer: enemyPlayerAnswer,
          roundPoints: enemyPoints,
          totalPoints: _.get(previousRound, `${enemyId}.totalPoints`, 0) + enemyPoints
        }
      })
    } else {
      $currentRound.setEach({
        [userId]: { answer: option }
      })
    }
  }

  function onButton1Press () {
    onButtonPress('F')
  }

  function onButton2Press () {
    onButtonPress('S')
  }

  return pug`
    Span(variant='h5')= question.text
    Br
    if currentRound[userId] && currentRound[enemyId]
      Span Waiting for next round
    else if currentRound[userId]
      Span Waiting for enemy answer
    else
      Row
        Button(
          onPress=onButton1Press
        )= question.button1Text
        Button(
          onPress=onButton2Press
        )= question.button2Text

  `
})
