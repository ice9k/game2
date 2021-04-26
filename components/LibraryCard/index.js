import React from 'react'
import {
  observer,
  useDoc,
  $root,
  useSession,
  emit,
  useModel
} from 'startupjs'
import { Row, Span, Button, Div } from '@startupjs/ui'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './index.styl'

export default observer(function LibraryCard ({ templateId, style }) {
  const [template, $template] = useDoc('templates', templateId)
  const [userId] = useSession('userId')
  const $rounds = useModel('rounds')
  const $games = useModel('games')

  async function createGame () {
    const gameId = $root.id()
    const roundId = $root.id()
    await $rounds.addNew({ id: roundId, roundIndex: 0, gameId })
    await $games.addNew({
      ...$template.getDeepCopy(),
      userId,
      id: gameId,
      rounds: [roundId]
    })
    emit('url', `/game/${gameId}`)
  }

  return pug`
    Div.root(
      onPress=() => emit('url', '/templates/' + templateId)
      style=style
    )
      Div.content
        Span.levelName(bold)= template.name
        Span.name(numberOfLines=2)= template.description

      Row.footer(align='right' vAlign='center')
        Button(
          icon=faPlus
          variant='flat'
          color='primary'
          onPress=createGame
        ) Game
  `
})
