import React, {Component} from 'react';
import Form from './Form/Form';
import Messages from './Messagess/Messages';
import '../styles/App.css';
import style from '../styles/style.scss';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <div className='logo'>
          <img src='./img/LOGO.svg' alt='logo' className='logo__img'/>
        </div>
        <Form/>
        <Messages/>
      </div>
    );
  }
}

export default App;