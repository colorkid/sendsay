import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer';
import App from './components/App.js';

let store = createStore(rootReducer);
console.log(store.getState());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
)