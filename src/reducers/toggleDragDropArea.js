import { TOGGLE_DRAG_DROP_AREA } from './actions';

const initialState = {
  isVisibilityDragDropArea: false
}

export function toggleDragDropArea(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAG_DROP_AREA:
      return Object.assign({}, state, {
        isVisibilityDragDropArea: !isVisibilityDragDropArea
      })
    default:
      return state
  }
}