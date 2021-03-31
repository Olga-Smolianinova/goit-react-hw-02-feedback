import { combineReducers } from 'redux'; //для композиции редьюсеров, то есть совмещать много в один

import { createReducer } from '@reduxjs/toolkit'; //для рефакторинга кода с помощью функции из toolkit

// import types from './todos-types'; // чтобы при дублировании type  избежать опечатки и ошибки создаем todos-types для удобства и избежания ошибок и подключаем их в этом файле
import actions from './todos-actions'; // types - больше не нужен. Вместо них - import actions

// редьюсер для items with Redux
// const items = (state = [], { type, payload }) => {
//   switch (type) {
//     case types.ADD:
//       return [...state, payload];

//     case types.DELETE:
//       return state.filter(todo => todo.id !== payload);

//     default:
//       return state;
//   }
// };

// редьюсер для items with Toolkit. В createReducer() - 1 параметр - это начальное значение state; 2 - это объект кейсов, где каждый ключ это тип действия, а значение - это редюсер для этого типа
// // types - больше не нужен
const items = createReducer([], {
  [actions.addTodo]: (state, { payload }) => [...state, payload],

  [actions.deleteTodo]: (state, { payload }) =>
    state.filter(todo => todo.id !== payload),

  // checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
  [actions.toggleCompleted]: (state, { payload }) =>
    state.map(todo =>
      todo.id === payload ? { ...todo, completed: !todo.completed } : todo,
    ),
});

// редьюсер для filter with Redux
// const filter = (state = '', { type, payload }) => {
//   switch (type) {
//     case 'todos/changeFilter':
//       return payload;

//     default:
//       return state;
//   }
// };

// редьюсер для filter with Toolkit. Когда state не нужен, он объявлен, но не используется, вместо него ставим _
const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
