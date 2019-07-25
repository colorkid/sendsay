export const SHOW_DRAG_DROP_AREA = 'SHOW_DRAG_DROP_AREA';
export const HIDE_DRAG_DROP_AREA = 'HIDE_DRAG_DROP_AREA';


export function showDragDropArea() {
    return { type: SHOW_DRAG_DROP_AREA }
}

export function hideDragDropArea() {
    return { type: HIDE_DRAG_DROP_AREA }
}