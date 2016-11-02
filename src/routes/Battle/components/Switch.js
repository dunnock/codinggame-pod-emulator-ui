import React, { PropTypes } from 'react'
import styles from './Switch.scss'

export const Switch = ( { checked, onClick, texton, textoff } ) => {
  return <span className={styles["switch-text"]} onClick={onClick}>
    {checked ? texton : textoff}
  </span>;
}

Switch.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Switch
