import { combineReducers } from 'redux'; //для композиции редьюсеров, то есть совмещать много в один

import { createReducer } from '@reduxjs/toolkit'; //для рефакторинга кода с помощью функции из toolkit

// for Redux
import actions from './todos-actions';

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

//1 - редьюсер для items with Toolkit. В createReducer() - 1 параметр - это начальное значение state; 2 - это объект кейсов, где каждый ключ это тип действия, а значение - это редюсер для этого типа

const items = createReducer([], {
  [actions.fetchTodosSuccess]: (_, { payload }) => payload, //чтобы при первой загрузке страницы отрисовывались все todos из локального бекенда (db.json)

  [actions.addTodoSuccess]: (state, { payload }) => [...state, payload],

  [actions.deleteTodoSuccess]: (state, { payload }) =>
    state.filter(todo => todo.id !== payload),

  // checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
  [actions.toggleComletedSuccess]: (state, { payload }) =>
    // если id совпадают верни обновленный payload
    state.map(todo => (todo.id === payload.id ? payload : todo)),
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

//2 - редьюсер для filter with Toolkit. Когда state не нужен, он объявлен, но не используется, вместо него ставим _
const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

// 3 - редьюсер для loading
const loading = createReducer(false, {
  // при первой загрузке страницы
  [actions.fetchTodosRequest]: () => true, //по default - false,загрузка началась, возвращаем => true

  // при выполненении http-запроса (выполнено или ошибка - загрузка (loading) - останавливается)
  [actions.fetchTodosSuccess]: () => false,
  [actions.fetchTodosError]: () => false,

  // повторяем логику при addTodo
  [actions.addTodoRequest]: () => true,

  [actions.addTodoSuccess]: () => false,
  [actions.addTodoError]: () => false,

  // повторяем логику для deleteTodo
  [actions.deleteTodoRequest]: () => true,

  [actions.deleteTodoSuccess]: () => false,
  [actions.deleteTodoError]: () => false,

  // повторяем логику для toggleCompleted
  [actions.toggleComletedRequest]: () => true,

  [actions.toggleComletedSuccess]: () => false,
  [actions.toggleComletedError]: () => false,
});

// 4 - редьюсер для error, для обработки ошибок
// const error = createReducer(null, {});

export default combineReducers({
  items,
  filter,
  loading, //для отображения состояния загрузки во время http-запроса
  // error, //для обработки ошибок
});
