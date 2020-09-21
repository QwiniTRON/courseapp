import React from 'react'

import s from './MenuToggle.module.scss'

export default ({ isOpen, onToggle }) => {
  const cls = [s['menu-toggle'], 'fa',]

  if (isOpen) {
    cls[cls.length] = 'fa-times'
    cls[cls.length] = s['open']
  } else {
    cls[cls.length] = 'fa-bars'
  }

  return (
    <i onClick={() => {onToggle()}} className={cls.join(' ')} />
  );
}