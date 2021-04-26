import React from 'react'
import { ScrollView } from 'react-native'
import { observer, useSession } from 'startupjs'
import ProfessorView from './ProfessorView'
import PlayerView from './PlayerView'

export default observer(function PGame () {
  const [role] = useSession('user.role')
  return pug`
    ScrollView
      if role === 'professor'
        ProfessorView
      else
        PlayerView
  `
})
