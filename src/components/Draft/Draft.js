import React, { Component } from 'react';

import Counter from './Counter';

import Dropdown from './Dropdown';

import ColorPicker from './ColorPicker';

import TodoList from './TodoList/TodoList';
import initialTodos from './TodoList/todos.json'; //данные для TodoList

// data for ColorPicker
const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class Draft extends Component {
  // state for TodoList
  state = {
    todos: initialTodos,
  };

  // для удаления элемента в TodoList при onClick на кнопку. Обращаемся к id элемента.
  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId), //берем предыдущий todos и отфильтровываем все элементы, кроме того у которого id совпадает
    }));
  };

  render() {
    // деструктуризируем todos
    const { todos } = this.state;

    //для рассчета Количество выполненных todos
    const completedTodosCount = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0,
    );

    return (
      <div>
        {/* Counter */}
        <Counter />

        {/* Dropdown Menu */}
        <Dropdown />

        {/* ColorPicker */}
        <ColorPicker options={colorPickerOptions} />

        {/* TodoList */}

        <div>
          <h2>TodoList</h2>
          <p>Total todos: {todos.length}</p>
          <p>Количество выполненных: {completedTodosCount}</p>
        </div>
        <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
      </div>
    );
  }
}
export default Draft;
