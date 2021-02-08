import React from 'react'
import { observer, useSession } from 'startupjs'
import { ScrollView } from 'react-native'
import { TestComponent } from 'components'
import ProfessorView from './ProfessorView'
import PlayerView from './PlayerView'
import './index.styl'
import { Content } from '@startupjs/ui'

export default observer(function PGame () {
  const [role] = useSession('user.role')
  return pug`
    ScrollView.root
      if role === 'professor'
        ProfessorView
      else
        PlayerView
  `
})
