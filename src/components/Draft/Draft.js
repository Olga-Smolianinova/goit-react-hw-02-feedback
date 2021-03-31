import React, { Component } from 'react';

// Components
import Counter from './Counter';

import Dropdown from './Dropdown';

import ColorPicker from './ColorPicker';

import TodoList from './TodoList/TodoList';
import Statictics from './Statistics/Statistics';
import TodoForm from './TodoForm/TodoForm';
import TodoFilter from './TodoFilter/TodoFilter';

// import initialTodos from './TodoList/todos.json'; //данные для TodoList
import './TodoList/TodoList.css'; //стили для TodoList

// для тренировки Form
// import Form from './Form/Form';

// LOCAL STORAGE И ЖИЗНЕННЫЕ ЦИКЛЫ
import Modal from './Modal/Modal'; //Modal window

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
    // для Модального окна
    showModal: false,
  };

  // чтобы при отравке (submit) формы получить доступ к state из Form.js. Это можно сделать через props. В data прокидываются ключи name,tag из state
  formSubmitHandler = data => {
    console.log(data);
  };

  // работа Модального окна. Открытие-закрытие в зависимости от предыдущего значения
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <div>
        {/* Counter */}
        <Counter />

        {/* Dropdown Menu */}
        <Dropdown />

        {/* ColorPicker */}
        <ColorPicker options={colorPickerOptions} />

        {/* Form for TodoList */}
        <TodoForm />

        {/* для фильтрации */}
        <TodoFilter />

        {/* Statictics */}
        <Statictics />

        {/* TodoList подключится к Redux, и возьмет из хранилища то, что ему нужно  */}
        <TodoList />

        {/* Form. чтобы при отравке (submit) формы получить доступ к state из Form.js добавляем prop onSubmit методом для этого */}
        {/* <Form onSubmit={this.formSubmitHandler} /> */}

        {/* Modal. Рендер по условию */}
        <button type="button" onClick={this.toggleModal}>
          Open modal window
        </button>

        {this.state.showModal && (
          //в props прокидываем toggleModal для возможности закрыть модалку по нажатию на "Escape"
          <Modal onClose={this.toggleModal}>
            <h1>Modal</h1>
            <button type="button" onClick={this.toggleModal}>
              Close Modal window
            </button>
          </Modal>
        )}
      </div>
    );
  }
}
export default Draft;
