import React from 'react'

import s from './FinishQuiz.module.scss'

import { Link } from 'react-router-dom'
import Button from '../UI/Button/Button.jsx'

export default function FinishQuiz({ results, quiz, onRetry }) {
  const checkIcon = <i className={'fa fa-check ' + s.success} />
  const errorIcon = <i className={'fa fa-times ' + s.error} />
  
  const answersPanel = quiz.map((question, idx) => {
    let answerResult = results[question.id]

    return (
      <li key={question.id}>
        <strong>{idx + 1}. &nbsp; </strong> {question.question} &nbsp;
        {answerResult === 'error' ? errorIcon : checkIcon}
      </li>
    )
  })


  const quizLength = quiz.length
  const successAnswer = Object.values(results).filter((status) => status !== 'error').length

  return (
    <div className={s["finish-quiz"]}>
      <ul>
        {answersPanel}
      </ul>

      <p>Правильно {successAnswer} из {quizLength}</p>
      <div className={s["navigation"]}>
        <Button onClick={() => { onRetry() }}>Повторить</Button>
        <Link to="/">
          <Button type="bisque">Список тестов</Button>
        </Link>
      </div>
    </div>
  );
}