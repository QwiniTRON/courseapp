import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_START,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  SET_QUIZ_TIMER,
  RETRY_QUIZ,
  CLEAR_QUIZ
} from '../actions/actionsTypes'


const initState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  quiz: null,
  answerTimeout: null
}

export default function quizReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return { ...state, loading: true }

    case FETCH_QUIZES_SUCCESS:
      return { ...state, quizes: action.payload, loading: false }

    case FETCH_QUIZES_ERROR:
      return { ...state, error: action.payload, loading: false }

    case FETCH_QUIZ_SUCCESS:
      return { ...state, quiz: action.payload, loading: false }

    case QUIZ_SET_STATE:
      return { ...state, answerState: action.payload.answerState, results: action.payload.result }

    case FINISH_QUIZ:
      return { ...state, isFinished: true }

    case QUIZ_NEXT_QUESTION:
      return { ...state, answerState: null, activeQuestion: action.payload + 1 }

    case SET_QUIZ_TIMER:
      return { ...state, answerTimeout: action.payload }

    case RETRY_QUIZ:
      return { ...state, results: {}, activeQuestion: 0, answerState: null, isFinished: false }

    case CLEAR_QUIZ:
      return { ...state, results: {}, activeQuestion: 0, answerState: null, isFinished: false }

    default:
      return state
  }
}