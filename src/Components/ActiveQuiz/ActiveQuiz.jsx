import React from 'react'

import s from './ActiveQuiz.module.scss'

import AnswersList from '../AnswersList/AnswersList.jsx'

export default function ActiveQuiz(props) {
    return (
        <div className={s["active-quiz"]}>
            <p className={s.question}>
                <span>
                    <strong>1.&nbsp;&nbsp;</strong>
                    {props.question}
                </span>
                <small>{props.answerNumber} из {props.quizLength}</small>
            </p>

            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state} />
        </div>
    );
}