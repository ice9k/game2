import React from 'react'
import { observer, emit, useValue, useLocal, useSession, useDoc, useQueryDoc} from 'startupjs'
import { TextInput, NumberInput, Br, Span, Button,  } from '@startupjs/ui'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { RoleSelect } from 'components'

export default observer(function ({ gameId }) {
  const [userId] = useSession('userId')
  const [number, $number] = useValue(0)

  const [game, $game] = useDoc('games', gameId)
  const { rounds } = game
  const roundId = rounds[rounds.length-1]
  const [currentRound, $currentRound] = useDoc('rounds', roundId)
  const previousRoundId = rounds[rounds.length-2]
  const [previousRound] = useDoc('rounds', previousRoundId)
  const [group] = useQueryDoc('groups', {
    gameId,
    userIds: userId
  })


  const enemyId = group.userIds.find(id => id !== userId)
  const questions = game.questions

  function acceptMaxNumber () {
    $currentRound.set('maxNumbers.' + group.id + '.accepted', true)
  }

  const onAccept = async ()  => {
    const enemyPlayerAnswer = _.get(currentRound, `${enemyId}.answer`, null)
    if (enemyPlayerAnswer) {
      const isGuesser = group[userId] === questions[2].role
      const isGuessed = number === enemyPlayerAnswer
      const winnerPoints = questions[2].winnerPoints
      const loserPoints = questions[2].loserPoints

      let points
      let enemyPoints

      if ((isGuesser && isGuessed) || (!isGuesser && !isGuessed)) {
        points = winnerPoints
        enemyPoints = loserPoints
      } else {
        points = loserPoints
        enemyPoints = winnerPoints
      }
      
      $currentRound.setEach({
        [userId] : {
          answer: number,
          roundPoints: points,
          totalPoints: _.get(previousRound, `${userId}.totalPoints`, 0) + points
        },
        [enemyId] : {
          answer: enemyPlayerAnswer,
          roundPoints: enemyPoints,
          totalPoints: _.get(previousRound, `${enemyId}.totalPoints`, 0) + enemyPoints
        },
      })
    } else {
      $currentRound.setEach({
        [userId]: { answer: number }
      })
    }
  }


  return pug`
    Br(half)
    Span(variant='h5')= questions[0].text
    Br(half)
    NumberInput(
      min=0
      disabled=_.get(currentRound, 'maxNumbers.'+group.id+'.accepted', false)
      value=_.get(currentRound, 'maxNumbers.'+group.id+'.number', 0)
      onChangeNumber=val => $currentRound.set('maxNumbers.' + group.id + '.number', val)
    )

    if _.get(currentRound, 'maxNumbers.'+group.id+'.accepted', false)
      if group[userId] === questions[1].role
        Br(half)
        Span= questions[1].text
        Br(half)
        NumberInput(
          min=0
          disabled=currentRound[userId]
          max=(currentRound.maxNumbers || {})[group.id].number || 0
          value=number
          onChangeNumber=val => $number.set(val)
        )
        if !currentRound[userId]
          Button(onPress=onAccept) Accept
      if group[userId] === questions[2].role
        Br(half)
        Span= questions[2].text
        Br(half)
        NumberInput(
          disabled=currentRound[userId]
          max=(currentRound.maxNumbers || {})[group.id].number || 0
          min=0
          value=number
          onChangeNumber=val => $number.set(val)
        )
        if !currentRound[userId]
          Button(onPress=onAccept) Accept
    else
      Br(half)
      Button(
        onPress=acceptMaxNumber
      ) Accept
    if currentRound[userId] && currentRound[enemyId]
      Span Waiting for next round
    else if currentRound[userId]
      Span Waiting for enemy answer
  `
})
