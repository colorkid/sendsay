import React, {Component} from 'react';
import Form from './Form/FormContainer/FormContainer';
import MessagesContainer from './Messages/MessagesContainer/MessagesContainer';
import '../styles/main.scss';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <div className='logo main__block'>
          <img src='./img/logo.svg' alt='logo' className='logo__img'/>
        </div>
        <Form mixClass='main__block'/>
        <MessagesContainer mixClass='main__block'/>
      </div>
    );
  }
}

export default App;