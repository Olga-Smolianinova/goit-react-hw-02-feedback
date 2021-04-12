import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; // configureStore - createStore для toolkit; getDefaultMiddleware - список default Middlewares (прослоек). К этому списку еще добавляем logger - прослойка (middleware), которая при console.log() отображает action (до и после).

import logger from 'redux-logger'; // прослойка (middleware) при console.log() отображает action (до и после)

import storage from 'redux-persist/lib/storage'; //для local storage

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; //позволяет записывать какие-либо данные куда-либо, например в local storage. persistStore - для всего store; persistReducer - для одного редьюсера. Все остальное - для проработки ошибок в консоли

// Reducers
import { todosReducer } from './todos'; // reducer для todos в TodoList //рефакторинг для сокращения прописывания пути, используя export {default} в index.js

import { authReducer } from './authorization';

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

// настройки для сохранения данных в local storage
const authPersistConfig = {
  key: 'authorization', //название ключа, который будет отображаться в local storage
  storage,
  whitelist: ['token'], //что отображать в local storage
};

// Для каждого объекта в глобальном state свой отдельный Reducer. И внизу этого файла есть корневой редьюсер (rootReducer), где ключ - это название компонента со state для него, а значение - редьюсер, который отвечает за него.
//createStore для toolkit -configureStore. DevTools у него уже под капотом. npm redux-devtools-extension можно удалять
const store = configureStore({
  // параметры configureStore из документации (reducer, devTools,  middleware и есть еще другие опции)

  // reducer: {}, под капотом уже использует combineReducers  from 'redux' для композиции редьюсеров, то есть совмещать много в один.
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer), //для обработки authorization. Оборачиваем в persistReducer (1 аргумент - config; 2 - reducer, который обрабатывает)
    todos: todosReducer, //для обработки todos
  }, //Значение - вызов rootReducer c  persistedReducer, для того чтобы записывать какие-либо данные куда-либо, например в local storage
  middleware, //возвращает список default Middlewares (прослоек), к которому добавляем еще logger =  прослойка (middleware) при console.log() отображает action (до и после)

  devTools: process.env.NODE_ENV === 'development', // чтобы DevTools были доступны только в разработке. Переменная окружения из node - process.env. NODE_ENV - описывает какой сейчас режим разработки: production || development
});

// Создаем  persistor - обертка над store, которая при изменении store будет записывать в local storage и обновлять его.
const persistor = persistStore(store);

// И export persistor  и store

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };

// export default store;
