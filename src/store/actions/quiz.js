import Axios from "../../axios/axios-quiz"
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  SET_QUIZ_TIMER,
  RETRY_QUIZ,
  CLEAR_QUIZ
} from './actionsTypes'

export function fetchQuizes() {
  return async (dispatch, getState) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await Axios.get('/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `Тест №${i + 1}`
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch (err) {
      dispatch(fetchQuizesError(err))
    }
  }
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())

    try {
      const response = await Axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data
      dispatch(fetchQuizSuccess(quiz))
    } catch (err) {
      dispatch(fetchQuizesError(err))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: quizes
  }
}

export function fetchQuizesError(err) {
  return {
    type: FETCH_QUIZES_ERROR,
    payload: err
  }
}

export function clearCurrentQuiz(err) {
  return {
    type: CLEAR_QUIZ
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  }
}

export function quizSetState(answerState, result) {
  return {
    type: QUIZ_SET_STATE,
    payload: { answerState, result }
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(step) {
  return {
    type: QUIZ_NEXT_QUESTION,
    payload: step
  }
}

export function setQuizTimer(timer) {
  return {
    type: SET_QUIZ_TIMER,
    payload: timer
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}

// ***
function quizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}
// ***

export function quizAnswerClick(id) {
  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerTimeout) return; // значит уже есть ответ


    const question = state.quiz[state.activeQuestion] // корректный вопрос
    const result = state.results // объект результатов

    if (question.rightAnswerId === id) {
      // id с правильным ответом совпал
      if (!state.answerTimeout) {
        // Для подсветки ответа
        dispatch(quizSetState({ [id]: 'succes' }, result))

        // Через секунду переходим к следующему вопросу
        const timer = setTimeout(() => {
          if (quizFinished(state)) {
            // завершение опроса
            result[question.id] = 'succes'
            dispatch(quizSetState(null, result))
            dispatch(finishQuiz())
          } else {
            // Верный ответ
            result[question.id] = 'succes'

            dispatch(quizSetState(null, result))
            dispatch(quizNextQuestion(state.activeQuestion))
          }
          dispatch(setQuizTimer(null))
        }, 1000)

        dispatch(setQuizTimer(timer))
      }

    } else {
      // Неверный ответ
      dispatch(quizSetState({ [id]: 'error' }, result))

      const timer = setTimeout(() => {
        if (quizFinished(state)) {
          // завершение опроса
          result[question.id] = 'error'

          dispatch(quizSetState(null, result))
          dispatch(finishQuiz())
        } else {
          // Неверный ответ
          result[question.id] = 'error'

          dispatch(quizSetState(null, result))
          dispatch(quizNextQuestion(state.activeQuestion))
        }
        dispatch(setQuizTimer(null))
      }, 1000)

      dispatch(setQuizTimer(timer))
    }
  }
}