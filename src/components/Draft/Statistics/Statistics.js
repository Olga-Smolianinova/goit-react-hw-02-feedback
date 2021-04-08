import React from 'react';

import { connect } from 'react-redux';

// Data
// import todosSelectors from '../../redux/todos/todos-selectors';

import { todosSelectors } from '../../redux/todos'; //рефакторинг для сокращения прописывания пути, используя export {default} в index.js

const Statictics = ({ total, completed }) => {
  return (
    <div className="TodoList">
      <h2>TodoList</h2>
      <p>Total todos: {total}</p>
      <p>Количество выполненных: {completed}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  // без использования selectors
  // total: state.todos.items.length,
  // completed: state.todos.items.reduce(
  //   (acc, todo) => (todo.completed ? acc + 1 : acc),
  //   0,
  // ),

  //с использованием selectors
  total: todosSelectors.getTotalTodoCount(state),
  completed: todosSelectors.getCompletedTodosCount(state),
});

export default connect(mapStateToProps)(Statictics);
