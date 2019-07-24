import React, { Component } from 'react';
import Form from './Form';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <div className='logo'>
          <img src='./img/LOGO.svg' alt='logo' className='logo__img'/>
        </div>
        <Form />
        <h2>Отправка сообщения</h2>
        <div>Сообщения</div>
      </div>
    );
  }
}

export default App;