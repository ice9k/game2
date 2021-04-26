import React from 'react'
import {
  observer,
  useSession,
  useValue,
  $root,
  emit
} from 'startupjs'
import { Div, Button } from '@startupjs/ui'
import { TemplateForm } from 'components'

export default observer(function PCreateTemplate ({ style }) {
  const [userId] = useSession('userId')
  const [data, $data] = useValue({})

  async function create () {
    await $root.add('templates', {
      ...data,
      userId,
      createdAt: Date.now(),
      id: $root.id()
    })
    emit('url', '/library')
  }

  return pug`
    Div
      TemplateForm(data=data $data=$data)
      Button(onPress=create) Create
  `
})
