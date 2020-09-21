import React from 'react'

import s from './Backdrop.module.scss'

export default ({onClick}) => {
  const cls = [s['backdrop']]

  return (
    <div onClick={() => {onClick()}} className={cls}></div>
  );
}