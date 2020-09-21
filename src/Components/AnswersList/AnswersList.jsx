import React from 'react'

import s from './AnswersList.module.scss'

import AnswerItem from './AnswerItem/AnswerItem.jsx'

export default function AnswersList(props) {
    return (
        <ul className={s['answers-list']}>
            {props.answers.map((answer, idx) => (
                <AnswerItem 
                answer={answer} 
                key={idx}
                onAnswerClick={props.onAnswerClick}
                state={props.state? props.state[answer.id] : false} />
            ))}
        </ul>
    );
}