/**
 * @file Redux reducer that stores filter query.
 * @author Roman Vasilyev
 */
  
const reducer = (state = '', action) => {
    switch(action.type) {
        case 'INPUT':
            return action.data
        default:
            return state
    }
}

/*
 * Action
 */
export const filter = (content) => {
    return {
        type: 'INPUT',
        data: content
    }
}

export default reducer