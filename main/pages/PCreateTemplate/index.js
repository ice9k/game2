import React from 'react'
import {
  observer,
  useValue,
  emit,
  useModel
} from 'startupjs'
import { Div, Button, Br } from '@startupjs/ui'
import { TemplateForm } from 'components'

export default observer(function PCreateTemplate ({ style }) {
  const [data, $data] = useValue({})
  const $templates = useModel('templates')

  async function create () {
    await $templates.addNew(data)
    emit('url', '/library')
  }

  return pug`
    Div
      TemplateForm(data=data $data=$data)
      Br(half)
      Button(onPress=create) Create
  `
})
