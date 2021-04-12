import React, { Component } from 'react';
import { connect } from 'react-redux';

// Data
import { todosOperations, todosSelectors } from '../redux/todos'; //рефакторинг для сокращения прописывания пути, используя export {default} в index.js

// Components
import Container from '../components/Container';
import TodoForm from '../components/TodoForm';
import TodoFilter from '../components/TodoFilter';
import Statictics from '../components/Statistics';
import TodoList from '../components/TodoList';

import Modal from '../components/Modal'; //Modal window

class TodosPage extends Component {
  // state for TodoList
  state = {
    // для Модального окна
    showModal: false,
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidMount() {
    // при Mount страницы, чтобы из локального бекенда db.json - отрисовывались данные (todos)
    this.props.fetchTodos();
  }

  // МЕТОДЫ
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
      <>
        <Container>
          {/* Form for TodoList */}
          <TodoForm />

          {/* для фильтрации */}
          <TodoFilter />

          {/* Statictics */}
          <Statictics />

          {/* добавляем отображение Loading при открытии страницы*/}
          {this.props.isLoadingTodos && <h2>Loading...</h2>}

          {/* TodoList подключится к Redux, и возьмет из хранилища то, что ему нужно  */}
          <TodoList />

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
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  // isLoadingTodos: state.todos.loading,//без использования selectors

  isLoadingTodos: todosSelectors.getLoading(state), //с использованием selectors
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(todosOperations.fetchTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage);
