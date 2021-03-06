/**
 * @file A notification component.
 * @author Roman Vasilyev
 */

 import React from 'react'
 import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.content)

  if (!notification) return null

  return (
    <div className='notification'>
      {notification}
    </div>
  )
}

export default Notification