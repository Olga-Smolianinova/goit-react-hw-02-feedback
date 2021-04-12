import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './authorization-actions';

const initialUserState = { name: null, email: null };

// обработка данных, которые возвращаются с бекенда (если все ок - user && token; если ошибка в запросе - error)
const user = createReducer(initialUserState, {
  // при успешном запросе на бекенд, записываем в глобальный state (initialUserState) - user (свойство, которое вернул бекенд)
  [authActions.registerSuccess]: (_, { payload }) => payload.user,

  // логинизация. бекенд возвращает то же самое, что и при регистрации
  [authActions.loginSuccess]: (_, { payload }) => payload.user,

  // для Logout никакие данные не нужны, set начальное состояние initialUserState
  [authActions.logoutSuccess]: () => initialUserState,

  // Для того, чтобы сохранить текущего пользователя, а не выполнять логизации каждый раз после обновления страницы; 1) сохраняем token в local storage и получаем к нему доступ через getState
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  // при успешном запросе на бекенд, записываем в глобальный state (initialUserState) - token (свойство, которое вернул бекенд)
  [authActions.registerSuccess]: (_, { payload }) => payload.token,

  // логинизация. бекенд возвращает то же самое, что и при регистрации
  [authActions.loginSuccess]: (_, { payload }) => payload.token,

  // для Logout  начальное состояние  token сбрасываем в null
  [authActions.logoutSuccess]: () => null,
});

// код дублируется в error, для улучшения рефакторим
const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.registerError]: setError,

  [authActions.loginError]: setError,

  [authActions.logoutError]: setError,

  [authActions.getCurrentUserError]: setError,
});

export default combineReducers({
  user,
  token,
  error,
});
