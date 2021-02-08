import React from 'react'
import { observer, emit, useValue, useLocal, useSession} from 'startupjs'
import { TextInput, NumberInput, Br, Span, Select } from '@startupjs/ui'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { RoleSelect } from 'components'

export default observer(function ({ data, $data }) {

  const { questions = [] } = data

  return pug`
    Br(half)
    TextInput(
      label='Enter first question text (for both players)'
      value=(questions[0] || {}).text
      onChangeText=val => $data.set('questions.0.text', val)
    )
    Br(half)
    TextInput(
      label='Enter second question text'
      value=(questions[1] || {}).text
      onChangeText=val => $data.set('questions.1.text', val)
    )
    Br(half)
    Select(
      label='Select role to diplay a second question'
      options=data.roles
      value=(questions[1] || {}).role
      onChange=val => $data.set('questions.1.role', val)
    )
    Br(half)
    TextInput(
      label='Enter third question text'
      value=(questions[2] || {}).text
      onChangeText=val => $data.set('questions.2.text', val)
    )
    Br(half)
    Select(
      label='Select role to diplay a third question'
      options=data.roles
      value=(questions[2] || {}).role
      onChange=val => $data.set('questions.2.role', val)
    )
    Br(half)
    Span Enter the number of points
    Br(half)
    NumberInput(
      label='Winner points'
      value=(questions[2] || {}).winnerPoints
      onChangeNumber=val => $data.set('questions.2.winnerPoints', val)
    )
    Br(half)
    NumberInput(
      label='Loser points'
      value=(questions[2] || {}).loserPoints
      onChangeNumber=val => $data.set('questions.2.loserPoints', val)
    )
  `
})
