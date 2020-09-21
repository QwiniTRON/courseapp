import React from 'react'

import s from './AnswerItem.module.scss'

export default function AnswerItem(props) {
    const classes = [s['answer-item']]

    if(props.state){
        classes.push(s[props.state])
    }

    return (
        <li className={classes.join(' ')} onClick={(event) => {props.onAnswerClick(props.answer.id)}}>
            {props.answer.text}
        </li>
    );
}