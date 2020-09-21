import React from 'react'

import s from './Input.module.scss'


function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

export default function Input({ type, label, value, onChangeHandle, placeholder, errorMessage, ...props }) {
  const inputType = type || 'text'
  const cls = [s['text-input']]
  const htmlFor = inputType + Math.random()
  const invalid = isInvalid(props)
  if (invalid) cls[cls.length] = s['invalid']

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        type={inputType}
        onChange={onChangeHandle}
        value={value}
        placeholder={placeholder} />
      {invalid && <span>{errorMessage || 'введите верное значение'}</span>}
    </div>
  );
}
