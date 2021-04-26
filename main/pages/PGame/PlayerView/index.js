import React from 'react'
import { ScrollView } from 'react-native'
import { observer, useSession, useLocal, useDoc, useQueryDoc, emit } from 'startupjs'
import { Span } from '@startupjs/ui'
import { Chat } from '@dmapper/chat'
import types from 'main/gameTypes'
import { GameHistory } from 'components'

export default observer(function PlayerView () {
  const [sessionUser] = useSession('user')
  const [gameId] = useLocal('$render.params.id')
  const [game] = useDoc('games', gameId)
  const [group] = useQueryDoc('groups', {
    gameId,
    userIds: sessionUser.id
  })

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
