import { combineReducers } from 'redux'
import { toggleDragDropArea, TOGGLE_DRAG_DROP_AREA } from './actions'

function visibilityDragDropArea(state = false, action) {
    switch (action.type) {
        case TOGGLE_DRAG_DROP_AREA:
            return action.filter
        default:
            return state
      }
}

const todoApp = combineReducers({
    visibilityDragDropArea
})

export default todoApp