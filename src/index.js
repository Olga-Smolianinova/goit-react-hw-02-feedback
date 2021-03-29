import React from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; //Для подключение  глобального store  к Redux. Достаем  Provider  (пакет из react-redux) - компонент, который оборачивает все наше приложение, он ставится поверх App, и он через контекст (контекст - это глобальная переменная) может прокидывать в глубину и на любую вложенность дополнительный функционал.

// Components
//  Для передачи Provider в props store, с ссылкой на наше хранилище  сначала импортируем файл
import store from './components/redux/store';

import App from './App';

import './index.css';

import 'modern-normalize/modern-normalize.css'; //подключение стилей для normalize

ReactDOM.render(
  <React.StrictMode>
    {/* Для подключения глобального store к Redux. Достаем Provider (пакет из react-redux) -
    компонент, который оборачивает все наше приложение, он ставится поверх App,
    и он через контекст (контекст - это глобальная переменная) может прокидывать
    в глубину и на любую вложенность дополнительный функционал. Provider в props передаем store (файл которого перед тем import) , с ссылкой на наше хранилище  */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
