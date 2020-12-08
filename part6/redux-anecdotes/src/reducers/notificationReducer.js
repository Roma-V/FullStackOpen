/**
 * @file Redux reducer that stores notification.
 * @author Roman Vasilyev
 */

const reducer = (state = null, action) => {
    switch(action.type) {
        case 'SHOW':
            return action.data
        case 'HIDE': 
            return null
        default:
            return state
    }
}

/*
 * Actions
 */
export const showNotification = (content) => {
    return {
        type: 'SHOW',
        data: content
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE'
    }
}

export default reducer