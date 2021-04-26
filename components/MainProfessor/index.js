import React from 'react'
import {
  observer,
  useSession,
  useQuery,
  emit
} from 'startupjs'
import './index.styl'
import { Div, Button } from '@startupjs/ui'

export default observer(function MainProfessor ({ style }) {
  const [sessionUser] = useSession('user')
  const [games] = useQuery('games', {
    userId: sessionUser.id,
    finished: { $ne: true }
  })

  return pug`
    each game in games
      Div(key=game.id)
        Button.btn(onPress=() => emit('url', '/game/' + game.id))= 'Join ' + game.name
  `
})
