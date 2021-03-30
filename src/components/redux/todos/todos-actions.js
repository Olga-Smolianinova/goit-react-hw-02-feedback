import shortId from 'shortid'; //npm для создания уникальных ID

import types from './todos-types'; // чтобы при дублировании type  избежать опечатки и ошибки создаем todos-types для удобства и избежания ошибок и подключаем их в этом файле в todos-actions.js

const addTodo = text => ({
  type: types.ADD, //подключаем значение из файла todos-types, которое import из него как types
  payload: {
    id: shortId.generate(), //присваиваем уникальный ID
    text,
    completed: false,
  },
});

const deleteTodo = todoId => ({
  type: types.DELETE,
  payload: todoId,
});

const changeFilter = value => ({
  type: types.CHANGE_FILTER,
  payload: value,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { addTodo, deleteTodo, changeFilter };
