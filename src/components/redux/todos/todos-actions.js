import { createAction } from '@reduxjs/toolkit';

import shortId from 'shortid'; //npm для создания уникальных ID

// import types from './todos-types'; // чтобы при дублировании type  избежать опечатки и ошибки создаем todos-types для удобства и избежания ошибок и подключаем их в этом файле в todos-actions.js

// with Redux
// const addTodo = text => ({
//   type: types.ADD, //подключаем значение из файла todos-types, которое import из него как types
//   payload: {
//     id: shortId.generate(), //присваиваем уникальный ID
//     text,
//     completed: false,
//   },
// });

// with Toolkit. Возвращает {type: types.ADD, payload: ....}, но нам нужен более сложный тип payload с ID, text, completed. В этом случае Prepare Callbacks (это 2 параметр createAction - prepareAction). createAction(types, prepareAction).
// Во 2 параметр createAction - мы передаем функцию, в которой можно подготовить формат payload
// types - больше не нужен
const addTodo = createAction('todos/add', text => {
  return {
    payload: {
      id: shortId.generate(), //присваиваем уникальный ID
      text,
      completed: false,
    },
  };
});

// with Redux
// const deleteTodo = todoId => ({
//   type: types.DELETE,
//   payload: todoId,
// });

// with Toolkit
const deleteTodo = createAction('todos/delete');

// with Redux
// const changeFilter = value => ({
//   type: types.CHANGE_FILTER,
//   payload: value,
// });

// with Toolkit.  В параметры createAction передаем сразу type. И дополнительно их больше не нужно будет объявлять как в Redux. А в payload запишется то, что мы передадим при вызове changeFilter
const changeFilter = createAction('todos/changeFilter');

// with Toolkit  checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
const toggleCompleted = createAction('todos/toggleCompleted');

// eslint-disable-next-line import/no-anonymous-default-export
export default { addTodo, deleteTodo, changeFilter, toggleCompleted };
