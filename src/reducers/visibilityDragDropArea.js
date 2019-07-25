import { SHOW_DRAG_DROP_AREA, HIDE_DRAG_DROP_AREA } from './actions';

const DEFAULT_STATE = false;

export function visibilityDragDropArea(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SHOW_DRAG_DROP_AREA:
    	return true;
    case HIDE_DRAG_DROP_AREA:
    	return false;	
    default:
      	return state
  }
}