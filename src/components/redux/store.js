// import { combineReducers } from 'redux'; //для композиции редьюсеров, то есть совмещать много в один

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; // configureStore - createStore для toolkit; getDefaultMiddleware - список default Middlewares (прослоек). К этому списку еще добавляем logger - прослойка (middleware), которая при console.log() отображает action (до и после).

import logger from 'redux-logger'; // прослойка (middleware) при console.log() отображает action (до и после)

import {
  // persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; //позволяет записывать какие-либо данные куда-либо, например в local storage. persistStore - для всего store; persistReducer - для одного редьюсера. Все остальное - для проработки ошибок в консоли

// Reducers
import counterReducer from './counter/counter-reducer'; //reducer для Counter

import todosReducer from './todos/todos-reducer'; // reducer для todos в TodoList

// для того, чтобы работать с http-запросами нужно прописать дополнительную настройку. Он уже есть под капотом функции configureStore в toolkit и находится внутри  default Middlewares. Это thunk -  default способ для работы  с  http-запросами в Redux. http-запросам нужно делать в action,  в reducer - нельзя

// создаем  массив стека прослоек, который вернет список default Middlewares (прослоек), к которому добавляем еще logger
const middleware = [
  // 1) default Middlewares (прослоек)
  ...getDefaultMiddleware({
    //2) объект настроек для проработки ошибок в консоли при проверке целостности state, т.е. указываем что нужно игнорировать, чтобы консоль не светилась красными предупреждениями
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger, // 3) прослойка (middleware) при console.log() отображает action (до и после) и добавляем его в reducer
];

// Для каждого объекта в глобальном state свой отдельный Reducer. И внизу этого файла есть корневой редьюсер (rootReducer), где ключ - это название компонента со state для него, а значение - редьюсер, который отвечает за него.
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
// const persistor = persistStore(store);

// И export persistor  и store

// eslint-disable-next-line import/no-anonymous-default-export
// export default { store, persistor };
export default store;
// больше не нужно сохранять todos local storage, т.к. будем работать с backand
//redux-persist не удаляем, т.к. он понадобится
