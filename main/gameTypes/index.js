import TDilemmaPlay from './dilemma/TDilemmaPlay'
import TDilemmaEdit from './dilemma/TDilemmaEdit'
import TGuessPlay from './guess/TGuessPlay'
import TGuessEdit from './guess/TGuessEdit'

export default {
  dilemma: {
    play: TDilemmaPlay,
    edit: TDilemmaEdit
  },
  guess: {
    play: TGuessPlay,
    edit: TGuessEdit
  }
}

export const selectOptions = [
  {
    label: 'Prisoner\'s dilemma',
    value: 'dilemma'
  },
  {
    label: 'Guess the number',
    value: 'guess'
  }
]
