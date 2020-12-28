/**
 * @file A notification component.
 * @author Roman Vasilyev
 */

import React from 'react'
import style from './Notification.css'

const Notification = ({ type, message}) => {
    // Conditional render
    if (!message) return null

    return (
    <div 
        style={style}
        className={type}>
        {message}
    </div>
    )
}

export default Notification