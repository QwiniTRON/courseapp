import React from 'react'

import s from './Select.module.scss'

export default function Select({ options, label, value, onChange, ...props }) {
  const cls = [s['select']]
  const htmlFor = 'select' + Math.random()

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}>

        {options.map((opt, i) => {
          return (
            <option key={i + opt.value} value={opt.value}>
              {opt.text}
            </option>
          );
        })}

      </select>
    </div>
  );
}
