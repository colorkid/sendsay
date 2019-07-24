import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.formRef = React.createRef();
    this.dragDropPreventDefaults = this.dragDropPreventDefaults.bind(this);
  }

  dragDropPreventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <form>
        <h1 className='form__title'>Отправлялка сообщений</h1>
        <div className='form__row'>
          <span className='field-info'>От кого</span>
          <input type='text' placeholder='Имя' className='form__input'/>
          <input type='email' placeholder='Email' />
        </div>
        <div className='form__row'>
          <span className='field-info'>Кому</span>
          <input type='text' placeholder='Имя' className='form__input'/>
          <input type='email' placeholder='Email' className='form__input'/>
        </div>
        <div className='form__row'>
          <span className='field-info'>Тема письма</span>
          <input type='text' />
        </div>
        <div className='form__row'>
          <span className='field-info'>Сообщение</span>
          <textarea></textarea>
        </div>
        <div className='form__row'>
          <button type="button" className='button-upload'>Прикрпепить файл</button>
        </div>
        <button>Отправить</button>
      </form>    
    );
  }
}

export default Form;