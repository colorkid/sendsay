import React from "react";
import PropTypes from 'prop-types';
import Field from "./Field";
import TextArea from "./TextArea";
import WarningParagraph from "./WarningParagraph";

const FieldsList = React.memo(function FieldsList(props) {
  const dataForm = props.dataForm;
  return (
    <div className='fields-list'>
      <div className='fields-list__row'>
        <div className='fields-list__cell'>
          <span className='fields-list__title'>От кого</span>
          <Field
            name='nameFrom'
            placeholder='Имя'
            value={dataForm.nameFrom}
            type='text'
            handleInputChange={props.handleInputChange}
          />
          {props.emptyFields.includes('nameFrom') && <WarningParagraph message='Поле не может быть пустым'/>}
        </div>
        <div className='fields-list__cell'>
          <Field
            name='emailFrom'
            placeholder='Email'
            value={dataForm.emailFrom}
            type='email'
            handleInputChange={props.handleInputChange}
          />
          {(props.emptyFields.includes('emailFrom') && <WarningParagraph message='Email не может быть пустым'/>)
          || (props.invalidEmails.includes('emailFrom') && <WarningParagraph message='Email введен некорректно'/>)}
        </div>
      </div>
      <div className='fields-list__row'>
        <div className='fields-list__cell'>
          <span className='fields-list__title'>Кому</span>
          <Field
            name='nameTo'
            placeholder='Имя'
            value={dataForm.nameTo}
            type='text'
            handleInputChange={props.handleInputChange}
          />
          {props.emptyFields.includes('nameTo') && <WarningParagraph message='Поле не может быть пустым'/>}
        </div>
        <div className='fields-list__cell'>
          <Field
            name='emailTo'
            placeholder='Email'
            value={dataForm.emailTo}
            type='email'
            handleInputChange={props.handleInputChange}
          />
          {(props.emptyFields.includes('emailTo') && <WarningParagraph message='Email не может быть пустым'/>)
          || (props.invalidEmails.includes('emailTo') && <WarningParagraph message='Email введен некорректно'/>)}
        </div>
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Тема письма</span>
        <Field
          name='messageSubject'
          value={dataForm.messageSubject}
          type='text'
          handleInputChange={props.handleInputChange}
        />
        {props.emptyFields.includes('messageSubject') && <WarningParagraph message='Поле не может быть пустым'/>}
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Сообщение</span>
        <TextArea
          name='message'
          value={dataForm.message}
          handleInputChange={props.handleInputChange}
        />
        {props.emptyFields.includes('message') && <WarningParagraph message='Сообщение не может быть пустым'/>}
      </div>
    </div>
  )
});

FieldsList.propTypes = {
  dataForm: PropTypes.object,
  handleInputChange: PropTypes.func,
  emptyFields: PropTypes.array,
  invalidEmails: PropTypes.array
};

export default FieldsList;