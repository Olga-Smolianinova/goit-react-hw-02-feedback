import React, { Component } from 'react';

import { connect } from 'react-redux';

// Data
import { todosOperations } from '../../redux/todos'; //рефакторинг для сокращения прописывания пути, используя export {default} в index.js

// Styles
import './TodoForm.css';

class TodoForm extends Component {
  state = {
    message: '',
  };

  handleChange = event => {
    this.setState({ message: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    // проверка на пустую строку. Код выполнится в случае сли пользователь не отправляет пустую строку
    if (this.state.message !== '') {
      // вызов addTodo из Draft.js <Form onSubmit={this.formSubmitHandler};
      this.props.onSubmit(this.state.message);

      // reset для очищения textarea
      this.setState({ message: '' });

      return;
    }
    alert('Нужно ввести текст заметки!');
  };

  render() {
    return (
      <form className="TodoEditor" onSubmit={this.handleSubmit}>
        <textarea
          value={this.state.message}
          onChange={this.handleChange}
          className="TodoEditor__textarea"
        ></textarea>

        <button type="submit" className="TodoEditor__button">
          Add
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: text => dispatch(todosOperations.addTodo(text)),
});

export default connect(null, mapDispatchToProps)(TodoForm);
