import React from 'react';

import { connect } from 'react-redux'; //подключение к Redux

import todosActions from '../../redux/todos/todos-actions';

import classNames from 'classnames'; //подключаем npm i classnames для удобства и  возможности объединения несколькиз class в одном свойстве

import IconButton from '../IconButton';

import { ReactComponent as DeleteIcon } from '../../../icons/delete.svg'; //import иконки для удаления

import './TodoList.css'; //import компонента кнопки

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => {
  return (
    <ul className="TodoList">
      {todos.map(({ id, text, completed }) => (
        <li
          key={id}
          // в className подключаем несколько class с помощью import classNames from 'classnames'
          className={classNames('TodoList__item', {
            'TodoList__item--completed': completed,
          })}
        >
          {/* вставляем checkbox */}
          <input
            type="checkbox"
            className="TodoList__checkbox"
            checked={completed}
            onChange={() => onToggleCompleted(id)}
          />

          <p className="TodoList__text">{text}</p>

          {/* Вставка IconButton. // когда в кнопке отстутствует текст (в случае когда там иконка) необходимо передавать атрибут доступности aria-label и в самом компоненте IconButton распыляем props {...allProps} */}
          <IconButton
            onClick={() => {
              onDeleteTodo(id);
            }}
            aria-label="Delete"
          >
            {/* Вставка иконки для удаления delete.svg */}
            <DeleteIcon width="25" height="25" fill="#fff" />
          </IconButton>

          <button
            type="button"
            className="TodoList__btn"
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

// метод для отображения по фильтру.   Отфильтровываем те todos, которые includes то, что мы записали в input Фильтр по имени и в TodoList рендерим не все <TodoList
//   todos={todos}, а только отфильтрованые, т.е.  todos={filteredTodos}
// />
const getFilteredTodos = (allTodos, filter) => {
  // для чистоты кода выведем this.state.filter.toLowerCase() в отдельную переменную
  const normalizedFilter = filter.toLowerCase();

  return allTodos.filter(todo =>
    todo.text.toLowerCase().includes(normalizedFilter),
  );
};

// const mapStateToProps = state => {
//   // для отображения по фильтру
//   const { filter, items } = state.todos;

//   const filteredTodos = getFilteredTodos(items, filter);

//   return {
//     todos: filteredTodos,
//   };
// };

// или такой вариант рефакторинга кода
const mapStateToProps = ({ todos: { items, filter } }) => ({
  todos: getFilteredTodos(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteTodo: id => dispatch(todosActions.deleteTodo(id)),
  onToggleCompleted: () => null,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
