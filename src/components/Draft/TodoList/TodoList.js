import React from 'react';

import s from './TodoList.module.css';

const TodoList = ({ todos, onDeleteTodo }) => {
  return (
    <ul className={s.TodoList}>
      {todos.map(({ id, text }) => (
        <li key={id} className={s.TodoList__item}>
          <p className={s.TodoList__text}>{text}</p>
          <button
            onClick={() => {
              onDeleteTodo(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
