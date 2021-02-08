import React from 'react'
import { observer, useSession, useLocal, useDoc, useQueryDoc, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import { TestComponent, GameHistory } from 'components'
// import './index.styl'
import types from 'main/gameTypes'
import { Content, Span, Button } from '@startupjs/ui'
import { Messenger, Chat } from '@dmapper/chat'

export default observer(function PlayerView () {
  const [sessionUser, $sessionUser] = useSession('user')
  const [gameId] = useLocal('$render.params.id')
  const [game] = useDoc('games', gameId)
  const [group] = useQueryDoc('groups', {
    gameId,
    userIds: sessionUser.id
  })
  const { player1, player2, rounds } = game
  const [user1] = useDoc('users', player1)
  const [user2] = useDoc('users', player2)

  const Template = (types[game.type] || {}).play

  if (!game.usersByRoles && !group) emit('url', '/')

  return pug`
    ScrollView.root
      if !group
        Span Waiting for group formation
      else
        GameHistory(gameId=gameId)
        if Template
          Template(gameId=gameId)
        Chat(chatId=group.chatId style={})
  `
})
