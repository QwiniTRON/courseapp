import {
  CREATE_QUIZ_QESTION,
  RESET_QUIZ_CREATOR
} from '../actions/actionsTypes'


const initState = {
  quiz: []
}

export default function createReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QESTION:
      return { ...state, quiz: [...state.quiz, action.payload] }

    case RESET_QUIZ_CREATOR:
      return { ...state, quiz: []}

    default:
      return state
  }
}