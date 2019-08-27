import React from "react";
import PropTypes from 'prop-types';
import Field from "../Shared/Field";
import TextArea from "../Shared/TextArea";
import WarningParagraph from "../Shared/WarningParagraph";
import FieldTitle from "../Shared/FieldTitle";

const FieldsList = React.memo(function FieldsList(props) {
  const dataForm = props.dataForm;
  return (
    <div className='fields-list'>
      <div className='fields-list__row'>
        <div className='fields-list__cell'>
          <FieldTitle name='fields-list__title' title='От кого'/>
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
          <FieldTitle name='fields-list__title' title='Кому'/>
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
        <FieldTitle name='fields-list__title' title='Тема письма'/>
        <Field
          name='messageSubject'
          value={dataForm.messageSubject}
          type='text'
          handleInputChange={props.handleInputChange}
        />
        {props.emptyFields.includes('messageSubject') && <WarningParagraph message='Поле не может быть пустым'/>}
      </div>
      <div className='fields-list__row'>
        <FieldTitle name='fields-list__title' title='Сообщение'/>
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