// import { combineReducers } from 'redux'; //для композиции редьюсеров, то есть совмещать много в один

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; // configureStore - createStore для toolkit; getDefaultMiddleware - список default Middlewares (прослоек). К этому списку еще добавляем logger - прослойка (middleware), которая при console.log() отображает action (до и после).

import logger from 'redux-logger'; // прослойка (middleware) при console.log() отображает action (до и после)

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; //позволяет записывать какие-либо данные куда-либо, например в local storage. persistStore - для всего store; persistReducer - для одного редьюсера. Все остальное - для проработки ошибок в консоли

// import { composeWithDevTools } from 'redux-devtools-extension'; //для подлючения Redux devtools и настройки стека прослоек

// Reducers
import counterReducer from './counter/counter-reducer'; //reducer для Counter

import todosReducer from './todos/todos-reducer'; // reducer для todos в TodoList

// Для каждого объекта в глобальном state свой отдельный Reducer. И внизу этого файла есть корневой редьюсер (rootReducer), где ключ - это название компонента со state для него, а значение - редьюсер, который отвечает за него.

//redux-logger - прослойка (middleware) при console.log() отображает action (до и после). Чтобы ее добавить - устанавливаем и import logger
// getDefaultMiddleware - список default Middlewares (прослоек)

// создаем новый стек прослоек, который вернет список default Middlewares (прослоек), к которому добавляем еще logger =  прослойка (middleware) при console.log() отображает action (до и после) и добавляем его в reducer
const middleware = [
  ...getDefaultMiddleware({
    // объект настроек для проработки ошибок в консоли при проверке целостности state, т.е. указываем что нужно игнорировать, чтобы консоль не светилась красными предупреждениями
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

//createStore для toolkit -configureStore. DevTools у него уже под капотом. npm redux-devtools-extension можно удалять
const store = configureStore({
  // параметры configureStore из документации (reducer, devTools,  middleware и есть еще другие опции)

  // reducer: {}, под капотом уже использует combineReducers  from 'redux' для композиции редьюсеров, то есть совмещать много в один.
  reducer: {
    counter: counterReducer,

    todos: todosReducer,
  }, //Значение - вызов rootReducer c  persistedReducer, для того чтобы записывать какие-либо данные куда-либо, например в local storage
  middleware, //возвращает список default Middlewares (прослоек), к которому добавляем еще logger =  прослойка (middleware) при console.log() отображает action (до и после)

  devTools: process.env.NODE_ENV === 'development', // чтобы DevTools были доступны только в разработке. Переменная окружения из node - process.env. NODE_ENV - описывает какой сейчас режим разработки: production || development
});

//Создаем  persistor - обертка над store, которая при изменении store будет записывать в local storage и обновлять его.
const persistor = persistStore(store);

// И export persistor  и store

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };

// больше не нужно сохранять todos local storage, т.к. будем работать с backand
//redux-persist не удаляем, т.к. он понадобится для для хранения данных залогиненного пользователя. До этогоо использовали этот пакет для хранения данных в local storage. persistReducer удаляем и его конфигурацию
