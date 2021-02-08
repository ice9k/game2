import React from 'react'
import {
  observer,
  useSession,
  emit,
  useQuery
} from 'startupjs'
import types, { selectOptions } from 'main/gameTypes'
// import './index.styl'
import { Div, Button, Row, Br, TextInput, Span, NumberInput, Select } from '@startupjs/ui'
import { faPlus, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
  
export default observer(function TemplateForm ({ data, $data }) {
  const [userId] = useSession('userId')

  const addRole = () => {
    if (!data.roles || (data.roles[data.roles.length - 1] !== '')) {
      $data.push('roles', '')
    }
  }

  const Template = (types[data.type] || {}).edit 

  return pug`
    Div
      Br(half)
      TextInput(
        label='Name'
        value=data.name
        onChangeText=text => $data.set('name', text)
      )
      Br(half)
      TextInput(
        label='Description'
        value=data.description
        onChangeText=text => $data.set('description', text)
      )
      Span(bold) Roles
      if data.roles
        each item, index in data.roles
          Row.item(vAlign='center' align='between' key=index)
            Div.itemInput
              TextInput(
                value=item
                onChangeText=text => {
                  $data.remove('roles', index, 1)
                  $data.insert('roles', index, text)
                }
                placeholder='Write here...'
                numberOfLines=1
              )
            Button.del(
              icon=faTimesCircle
              variant='text'
              onPress=() => $data.remove('roles', index)
            )
      if !data.roles || data.roles.length < 2
        Row.item(vAlign='center' align='between')
          Button.add(
            icon=faPlus
            variant='outlined'
            color='primary'
            onPress=addRole
          ) Add role

      Br
      Span(bold) Rounds count
      NumberInput(
        min=1
        max=10
        value=data.roundsCount
        onChangeNumber=val => $data.set('roundsCount', val)
      )
      Br
      Select(
        label='Game type'
        options=selectOptions
        value=data.type
        onChange=val => {
          $data.set('type', val)
          $data.del('questions')
        }
      )
      if Template
        Template(data=data $data=$data)

  `
})
