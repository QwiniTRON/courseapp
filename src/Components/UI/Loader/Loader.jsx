import React from 'react'

import s from './Loader.module.scss'

export default function Auth(props) {
  return (
    <div className={s["lds-facebook"]}><div/><div/><div/></div>
  );
}
