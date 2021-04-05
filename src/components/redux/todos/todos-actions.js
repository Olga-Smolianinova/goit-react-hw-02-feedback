import { createAction } from '@reduxjs/toolkit';

// т.к. при http-запросе обрабатывается логика при старте, успешном получении данных и в случае ошибки - создаем отдельных файл для таких операций (todos-operation.js). А в этом файле прописываем 4 отдельных actions для этих случаев

//1- для отрисовки всей базы
const fetchTodosRequest = createAction('todos/fetchTodosRequest'); //при старте
const fetchTodosSuccess = createAction('todos/fetchTodosSuccess'); // при успешном получении данных
const fetchTodosError = createAction('todos/fetchTodosError'); // в случае ошибки

// 2- для addTodo
const addTodoRequest = createAction('todos/addTodoRequest'); //при старте
const addTodoSuccess = createAction('todos/addTodoSuccess'); // при успешном получении данных
const addTodoError = createAction('todos/addTodoError'); // в случае ошибки

// with Toolkit без http-запроса. Возвращает {type: types.ADD, payload: ....}, но нам нужен более сложный тип payload с ID, text, completed. В этом случае Prepare Callbacks (это 2 параметр createAction - prepareAction). createAction(types, prepareAction).
// Во 2 параметр createAction - мы передаем функцию, в которой можно подготовить формат payload

// const addTodo = createAction('todos/add', text => {
//   return {
//     payload: {
//       id: shortId.generate(), //присваиваем уникальный ID
//       text,
//       completed: false,
//     },
//   };
// });

//3 - deleteTodo;
const deleteTodoRequest = createAction('todos/deleteTodoRequest'); //при старте
const deleteTodoSuccess = createAction('todos/deleteTodoSuccess'); // при успешном получении данных
const deleteTodoError = createAction('todos/deleteTodoError'); // в случае ошибки

// with Redux
// const changeFilter = value => ({
//   type: types.CHANGE_FILTER,
//   payload: value,
// });

// with Toolkit.  В параметры createAction передаем сразу type. И дополнительно их больше не нужно будет объявлять как в Redux. А в payload запишется то, что мы передадим при вызове changeFilter
const changeFilter = createAction('todos/changeFilter');

// with Toolkit  checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
// const toggleCompleted = createAction('todos/toggleCompleted');

//4 - для toggleCompleted
const toggleComletedRequest = createAction('todos/toggleComletedRequest'); //при старте
const toggleComletedSuccess = createAction('todos/toggleComletedSuccess'); // при успешном получении данных
const toggleComletedError = createAction('todos/toggleComletedeComletedError'); // в случае ошибки

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // для get
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosError,

  // addTodo,
  addTodoRequest,
  addTodoSuccess,
  addTodoError,

  // deleteTodo,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoError,

  changeFilter,

  // toggleCompleted,
  toggleComletedRequest,
  toggleComletedSuccess,
  toggleComletedError,
};
