import axios from '../../axios/axios-quiz'
import {
  CREATE_QUIZ_QESTION,
  RESET_QUIZ_CREATOR
} from './actionsTypes'


export function createQuizQuestion(questionItem) {
  return {
    type: CREATE_QUIZ_QESTION,
    payload: questionItem
  }
}

export function resetQuizCreator() {
  return {
    type: RESET_QUIZ_CREATOR
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    const state = getState().create

    try {
      await axios.post('/quizes.json', state.quiz)
      dispatch(resetQuizCreator())
    } catch (err) {

    }
  }
}