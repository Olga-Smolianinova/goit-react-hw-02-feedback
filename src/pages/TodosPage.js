import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Data
import { todosOperations, todosSelectors } from '../redux/todos'; //рефакторинг для сокращения прописывания пути, используя export {default} в index.js

// Components
import Container from '../components/Container';
import TodoForm from '../components/TodoForm';
import TodoFilter from '../components/TodoFilter';
import Statictics from '../components/Statistics';
import TodoList from '../components/TodoList';

import Modal from '../components/Modal'; //Modal window

//c React Hooks
export default function TodosPage() {
  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const isLoadingTodos = useSelector(todosSelectors.getLoading);

  // useState
  const [showModal, setShowModal] = useState(false);

  // useEffect
  useEffect(() => {
    // при Mount страницы, чтобы из бекенда - отрисовывались данные (todos)
    dispatch(todosOperations.fetchTodos());
  }, [dispatch]);

  //  работа Модального окна. Открытие-закрытие в зависимости от предыдущего значения
  // useCallback - нужно использовать, т.к. toggleModal переиспользуется в нескольких компонентах. Это значит, что при рендере TodosPage, а именно при изменнении каких-либо компонентов, которые переиспользуют toggleModal - каждый раз будет создаваться сама функция toggleModal, ее тело будет выпольняться и каждый раз ссылка будет новая  и каждый раз компоненты которые ее переиспользуют будут получать новый prop, в котором будет лежать объект, а это значит, что React будет каждый раз перерендеривать компоненты ни за что ни про что, даже если они не изменились. Это некорректно, и чтобы это исправить используем useCallback. C его использованием компоненты, которые переиспользуют toggleModal не будут перерендериваться лишний раз. Ссылка будет одна и та же (т.е. сделали мемоизацию для toggleModal)
  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

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
        {isLoadingTodos && <h2>Loading...</h2>}

        {/* TodoList подключится к Redux, и возьмет из хранилища то, что ему нужно  */}
        <TodoList />

        {/* Modal. Рендер по условию */}
        <button type="button" onClick={toggleModal}>
          Open modal window
        </button>

        {showModal && (
          //в props прокидываем toggleModal для возможности закрыть модалку по нажатию на "Escape"
          <Modal onClose={toggleModal}>
            <h1>Modal</h1>
            <button type="button" onClick={toggleModal}>
              Close Modal window
            </button>
          </Modal>
        )}
      </Container>
    </>
  );
}

// без React Hooks
// class TodosPage extends Component {
//   // state for TodoList
//   state = {
//     // для Модального окна
//     showModal: false,
//   };

//   // ЖИЗНЕННЫЕ ЦИКЛЫ
//   componentDidMount() {
//     // при Mount страницы, чтобы из локального бекенда db.json - отрисовывались данные (todos)
//     this.props.fetchTodos();
//   }

//   МЕТОДЫ
//  работа Модального окна. Открытие-закрытие в зависимости от предыдущего значения
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     return (
//       <>
//         <Container>
//           {/* Form for TodoList */}
//           <TodoForm />

//           {/* для фильтрации */}
//           <TodoFilter />

//           {/* Statictics */}
//           <Statictics />

//           {/* добавляем отображение Loading при открытии страницы*/}
//           {this.props.isLoadingTodos && <h2>Loading...</h2>}

//           {/* TodoList подключится к Redux, и возьмет из хранилища то, что ему нужно  */}
//           <TodoList />

//           {/* Modal. Рендер по условию */}
//           <button type="button" onClick={this.toggleModal}>
//             Open modal window
//           </button>

//           {this.state.showModal && (
//             //в props прокидываем toggleModal для возможности закрыть модалку по нажатию на "Escape"
//             <Modal onClose={this.toggleModal}>
//               <h1>Modal</h1>
//               <button type="button" onClick={this.toggleModal}>
//                 Close Modal window
//               </button>
//             </Modal>
//           )}
//         </Container>
//       </>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   // isLoadingTodos: state.todos.loading,//без использования selectors

//   isLoadingTodos: todosSelectors.getLoading(state), //с использованием selectors
// });

// const mapDispatchToProps = dispatch => ({
//   fetchTodos: () => dispatch(todosOperations.fetchTodos()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TodosPage);
