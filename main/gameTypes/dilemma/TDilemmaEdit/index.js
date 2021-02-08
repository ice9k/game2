import React from 'react'
import { observer, emit, useValue, useLocal, useSession} from 'startupjs'
import { TextInput, NumberInput, Br, Span, Select } from '@startupjs/ui'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { RoleSelect } from 'components'

export default observer(function ({ data, $data }) {

  const { questions = [{}] } = data

  return pug`
    Br(half)
    TextInput(
      label='Enter question text'
      value=questions[0].text
      onChangeText=val => $data.set('questions.0.text', val)
    )
    Br(half)
    TextInput(
      label='Enter first button text'
      value=questions[0].button1Text
      onChangeText=val => $data.set('questions.0.button1Text', val)
    )
    Br(half)
    TextInput(
      label='Enter second button text'
      value=questions[0].button2Text
      onChangeText=val => $data.set('questions.0.button2Text', val)
    )
    Br(half)
    Select(
      label='Select role to diplay a question'
      options=data.roles
      value=questions[0].role
      onChange=val => $data.set('questions.0.role', val)
    )
    Br(half)
    Span Enter the number of points that users become (or lose) in different cases
    Br(half)
    NumberInput(
      label='First button (both players)'
      value=questions[0].FFpoints
      onChangeNumber=val => $data.set('questions.0.FFpoints', val)
    )
    Br(half)
    NumberInput(
      label='Second button (both players)'
      value=questions[0].SSpoints
      onChangeNumber=val => $data.set('questions.0.SSpoints', val)
    )
    Br(half)
    NumberInput(
      label='First button (different answers)'
      value=questions[0].FSpoints
      onChangeNumber=val => $data.set('questions.0.FSpoints', val)
    )
    Br(half)
    NumberInput(
      label='Second button (different answers)'
      value=questions[0].SFpoints
      onChangeNumber=val => $data.set('questions.0.SFpoints', val)
    )
  `
})
