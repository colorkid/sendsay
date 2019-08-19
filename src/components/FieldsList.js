import React, { Component } from "react";
import PropTypes from 'prop-types';
import Field from "./Field";
import TextArea from "./TextArea";
import WarningParagraph from "./WarningParagraph";

class FieldsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataForm = this.props.dataForm;
    return <div className='fields-list'>
      <div className='fields-list__row'>
        <div className='fields-list__cell'>
          <span className='fields-list__title'>От кого</span>
          <Field
            name='nameFrom'
            placeholder='Имя'
            value={dataForm.nameFrom}
            type='text'
            handleInputChange={this.props.handleInputChange}
          />
          {this.props.invalidFields.includes('nameFrom') && <WarningParagraph subject='Поле'/>}
        </div>
        <div className='fields-list__cell'>
          <Field
            name='emailFrom'
            placeholder='Email'
            value={dataForm.emailFrom}
            type='email'
            handleInputChange={this.props.handleInputChange}
          />
          {this.props.invalidFields.includes('emailFrom') && <WarningParagraph subject='Email'/>}
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
            handleInputChange={this.props.handleInputChange}
          />
          {this.props.invalidFields.includes('nameTo') && <WarningParagraph subject='Поле'/>}
        </div>
        <div className='fields-list__cell'>
          <Field
            name='emailTo'
            placeholder='Email'
            value={dataForm.emailTo}
            type='email'
            handleInputChange={this.props.handleInputChange}
          />
          {this.props.invalidFields.includes('emailTo') && <WarningParagraph subject='Email'/>}
        </div>
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Тема письма</span>
        <Field
          name='messageSubject'
          value={dataForm.messageSubject}
          type='text'
          handleInputChange={this.props.handleInputChange}
        />
        {this.props.invalidFields.includes('messageSubject') && <WarningParagraph subject='Поле'/>}
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Сообщение</span>
        <TextArea
          name='message'
          value={dataForm.message}
          handleInputChange={this.props.handleInputChange}
        />
        {this.props.invalidFields.includes('message') && <WarningParagraph subject='Сообщение'/>}
      </div>
    </div>
  }
}

FieldsList.propTypes = {
  dataForm: PropTypes.object,
  handleInputChange: PropTypes.func,
  invalidFields: PropTypes.array
};

export default FieldsList;