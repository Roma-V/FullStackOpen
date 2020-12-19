/**
 * @file A notification component.
 * @author Roman Vasilyev
 */

import React from 'react'
import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.content)
  const type = useSelector(state => state.notification.type)

  if (!notification) return null

  return (
    <div className={type}>
      {notification}
    </div>
  )
}

export default Notification