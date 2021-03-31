import React from 'react';

import { connect } from 'react-redux';

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
  total: state.todos.items.length,
  completed: state.todos.items.reduce(
    (acc, todo) => (todo.completed ? acc + 1 : acc),
    0,
  ),
});

export default connect(mapStateToProps)(Statictics);
