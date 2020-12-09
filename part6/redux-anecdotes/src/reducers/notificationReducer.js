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
export const setNotification = (content, duration=5) => {
    return dispatch => {
        dispatch({
            type: 'SHOW',
            data: content
        })

        setTimeout(() => {
            dispatch({ type: 'HIDE' })
        }, duration*1000)
    }
}

export default reducer