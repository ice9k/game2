import React from 'react'
import {
  observer,
  useLocal,
  useDoc
} from 'startupjs'
import { Div } from '@startupjs/ui'
import { TemplateForm } from 'components'

export default observer(function PEditTemplate ({ style }) {
  const [id] = useLocal('$render.params.id')
  const [data, $data] = useDoc('templates', id)

  return pug`
    Div
      TemplateForm(data=data $data=$data)
  `
})
