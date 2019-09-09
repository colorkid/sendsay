import { messagesReducer } from './redux/messagesReducer';
import { addNewMessage, updateMessage } from "./redux/actions";
import { checkOnEmptyInput, checkOnValidEmail } from './utils/inpitValidateUtils';
import { createConvertedFiles, getFilesSize } from './utils/fileUtils';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectForm, { Form } from './components/Form/Form';

Enzyme.configure({ adapter: new Adapter() });

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


describe('Utils', () => {

  /* it('connect with Api', () => {
    const wrapper = shallow(<Form />);
    wrapper.instance()._connectApi();
    expect(wrapper.instance().sendsay).toBeTruthy();
  }); */

  it('checkOnEmptyInput', () => {
    expect(checkOnEmptyInput('')).toBe(false);
    expect(checkOnEmptyInput('1')).toBe(true);
    expect(checkOnEmptyInput('Hello')).toBe(true);
    expect(checkOnEmptyInput('   ')).toBe(false);
    expect(checkOnEmptyInput('Hello ')).toBe(true);
    expect(checkOnEmptyInput(' Hello ')).toBe(true);
    expect(checkOnEmptyInput(' Hello')).toBe(true);
    expect(checkOnEmptyInput('He      llo')).toBe(true);
    expect(checkOnEmptyInput('     1')).toBe(true);
    expect(checkOnEmptyInput(['value'])).toBe(false);
    expect(checkOnEmptyInput({property: 'value'})).toBe(false);
    expect(checkOnEmptyInput(null)).toBe(false);
    expect(checkOnEmptyInput(undefined)).toBe(false);
    expect(checkOnEmptyInput(123)).toBe(false);
    expect(checkOnEmptyInput(false)).toBe(false);
    expect(checkOnEmptyInput(true)).toBe(false);
  });

  it('checkOnValidEmail', () => {
    expect(checkOnValidEmail('email@domain.com')).toBe(true);
    expect(checkOnValidEmail('  email@domain.com  ')).toBe(true);
    expect(checkOnValidEmail('email@domain.com  ')).toBe(true);
    expect(checkOnValidEmail('  email@domain.com')).toBe(true);
    expect(checkOnValidEmail('firstname.lastname@domain.com')).toBe(true);
    expect(checkOnValidEmail('email@subdomain.domain.com')).toBe(true);
    expect(checkOnValidEmail('firstname+lastname@domain.com')).toBe(true);
    expect(checkOnValidEmail('"email"@domain.com')).toBe(true);
    expect(checkOnValidEmail('1234567890@domain.com')).toBe(true);
    expect(checkOnValidEmail('email@domain-one.com')).toBe(true);
    expect(checkOnValidEmail('_______@domain.com')).toBe(true);
    expect(checkOnValidEmail('email@domain.co.jp')).toBe(true);
    expect(checkOnValidEmail('firstname-lastname@domain.com')).toBe(true);
    expect(checkOnValidEmail('plainaddress')).toBe(false);
    expect(checkOnValidEmail('#@%^%#$@#$@#.com')).toBe(false);
    expect(checkOnValidEmail('Joe Smith <email@domain.com>')).toBe(false);
    expect(checkOnValidEmail('email.domain.com')).toBe(false);
    expect(checkOnValidEmail('email@domain@domain.com')).toBe(false);
    expect(checkOnValidEmail('.email@domain.com')).toBe(false);
    expect(checkOnValidEmail('email.@domain.com\t')).toBe(false);
    expect(checkOnValidEmail('email..email@domain.com')).toBe(false);
    expect(checkOnValidEmail('email@domain')).toBe(false);
    expect(checkOnValidEmail(['value'])).toBe(false);
    expect(checkOnValidEmail({property: 'value'})).toBe(false);
    expect(checkOnValidEmail(null)).toBe(false);
    expect(checkOnValidEmail(undefined)).toBe(false);
    expect(checkOnValidEmail(123)).toBe(false);
    expect(checkOnValidEmail(false)).toBe(false);
    expect(checkOnValidEmail(true)).toBe(false);
  });

  it('getFilesSize', () => {
    const fileOne = new File(['file'], 'fileOne.txt', { type: 'text/plain'});
    const fileTwo = new File(['file'], 'fileTwo.txt', { type: 'text/plain'});
    const fileThree = new File(['file'], 'fileThree.txt', { type: 'text/plain'});
    const allFiles = [fileOne, fileTwo, fileThree];
    const twoFiles = [fileTwo, fileThree];
    const oneFile = [fileOne];
    expect(getFilesSize(allFiles)).toEqual(12);
    expect(getFilesSize(twoFiles)).toEqual(8);
    expect(getFilesSize(oneFile)).toEqual(4);
    expect(getFilesSize([])).toBe(false);
    expect(getFilesSize('string')).toBe(false);
    expect(getFilesSize(123)).toBe(false);
    expect(getFilesSize({property: 'value'})).toBe(false);
    expect(getFilesSize(null)).toBe(false);
    expect(getFilesSize(undefined)).toBe(false);
    expect(getFilesSize(['str', 'str2'])).toBe(false);
    expect(getFilesSize(['null', {property: 'value'}])).toBe(false);
    expect(getFilesSize([fileTwo, 'str2'])).toBe(false);
    expect(getFilesSize([[], fileThree])).toBe(false);
  });
});
