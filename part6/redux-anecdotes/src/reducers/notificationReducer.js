/**
 * @file Redux reducer that stores notification.
 * @author Roman Vasilyev
 */

const hiddenState = {
    content: null,
    timerId: null
}

const reducer = (state = hiddenState, action) => {
    switch(action.type) {
        case 'notification/SHOW':
            return action.data
        case 'notification/HIDE':
            if (action.data.timerId === state.timerId) {
                return hiddenState
            }
            return state
        default:
            return state
    }
}

/*
 * Actions
 */
export const setNotification = (content, duration=5) => {
    return dispatch => {
        const timerId = window.setTimeout(() => {
            dispatch({
                type: 'notification/HIDE',
                data: {
                    content: null,
                    timerId
                }
            })
        }, duration*1000)

        dispatch({
            type: 'notification/SHOW',
            data: {
                content,
                timerId 
            }
        })
    }
}

export default reducer