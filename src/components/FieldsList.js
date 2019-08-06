import React, { Component } from "react";
import PropTypes from 'prop-types';
import Field from "./Field";
import TextArea from "./TextArea";

class FieldsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className='fields-list'>
      <div className='fields-list__row'>
        <span className='fields-list__title'>От кого</span>
        <Field
          name='nameFrom'
          placeholder='Имя'
          value={this.props.fieldsState.nameFrom}
          type='text'
          handleInputChange={this.props.handleInputChange}
        />
        <Field
          name='emailFrom'
          placeholder='Email'
          value={this.props.fieldsState.emailFrom}
          type='email'
          handleInputChange={this.props.handleInputChange}
        />
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Кому</span>
        <Field
          name='nameTo'
          placeholder='Имя'
          value={this.props.fieldsState.nameTo}
          type='text'
          handleInputChange={this.props.handleInputChange}
        />
        <Field
          name='emailTo'
          placeholder='Email'
          value={this.props.fieldsState.emailTo}
          type='email'
          handleInputChange={this.props.handleInputChange}
        />
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Кому</span>
        <Field
          name='messageSubject'
          value={this.props.fieldsState.messageSubject}
          type='text'
          handleInputChange={this.props.handleInputChange}
        />
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Кому</span>
        <TextArea
          name='message'
          value={this.props.fieldsState.message}
          handleInputChange={this.props.handleInputChange}
        />
      </div>
    </div>
  }
}

FieldsList.propTypes = {
  fieldsState: PropTypes.object,
  handleInputChange: PropTypes.func
}

export default FieldsList;