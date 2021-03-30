import { combineReducers } from 'redux';

import types from './todos-types'; // чтобы при дублировании type  избежать опечатки и ошибки создаем todos-types для удобства и избежания ошибок и подключаем их в этом файле

// редьюсер для items
const items = (state = [], { type, payload }) => {
  switch (type) {
    case types.ADD:
      return [...state, payload];

    case types.DELETE:
      return state.filter(todo => todo.id !== payload);

    default:
      return state;
  }
};

// редьюсер для filter
const filter = (state = '', { type, payload }) => {
  switch (type) {
    case types.CHANGE_FILTER:
      return payload;

    default:
      return state;
  }
};

export default combineReducers({
  items,
  filter,
});
