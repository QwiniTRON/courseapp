import React from 'react'

import s from './Button.module.scss'

export default function Button({ disabled, onClick = ()=>{}, children, type = 'neutral' }) {
  const cls = [s['btn'], s[type]]

  return (
    <button onClick={onClick} disabled={disabled} className={cls.join(' ')} type="button">{children}</button>
  );
}