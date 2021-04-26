import React from 'react'
import {
  observer,
  useSession,
  emit,
  useQuery
} from 'startupjs'
import './index.styl'
import { Div, Button, Row, Card } from '@startupjs/ui'
import { LibraryCard } from 'components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
  
export default observer(function PLibrary ({ style }) {
  const [userId] = useSession('userId')
  const [templates] = useQuery('templates', { userId })

  return pug`
    Div
      Button(
        icon=faPlus
        onPress=() => emit('url', '/create-template')
      ) Create template
      Row.list(wrap)
        each item in templates
          LibraryCard.card(templateId=item.id)
  `
})