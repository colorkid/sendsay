import { messagesReducer } from './redux/messagesReducer';
import { addNewMessage, updateMessage } from "./redux/actions";


describe('messages reducer', () => {

  it('ADD_MESSAGE', () => {
    expect(messagesReducer([], addNewMessage({id:1, 2:2}))).toHaveLength(1);
    expect(messagesReducer([{id:1, 2:2}], addNewMessage({id:2, 2:2}))).toHaveLength(2);
    expect(messagesReducer([{id:1, 2:2}, {id:2, 2:2}], addNewMessage({id:3, 2:2}))).toHaveLength(3);
    expect(messagesReducer([
      {id:1, 2:2},
      {id:2, 2:2},
      {id:3, 2:2},
      {id:4, 2:2},
      {id:5, 2:2}
      ], addNewMessage({id:6, 2:2}))).toHaveLength(6);
    expect(messagesReducer([{id:1, 2:2}], addNewMessage({id:1, 2:2}))).toEqual([{id:1, 2:2}]);
    expect(messagesReducer([
      {id:1, 2:2}, {id:2, 2:2}
      ], addNewMessage({id:1, 2:2}))).toEqual([{id:1, 2:2}, {id:2, 2:2}]);
  });

  it('UPDATE_MESSAGE', () => {
    expect(messagesReducer([{id:1, status:2}], updateMessage(1, 3))).toEqual([{id:1, status:3}]);
    expect(messagesReducer([
      {id:1, status:2},
      {id:2, status:323}
      ], updateMessage(2, 433))).toEqual([{id:1, status:2}, {id:2, status:433}]);
    expect(messagesReducer([
      {id:1, status:2},
      {id:2, status:1},
      {id:3, status:0}
    ], updateMessage(4, 111))).toEqual([{id:1, status:2}, {id:2, status:1}, {id:3, status:0}]);
  });

});
