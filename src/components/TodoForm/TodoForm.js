import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';

// Data
import { todosOperations } from '../../redux/todos'; //рефакторинг для сокращения прописывания пути, используя export {default} в index.js

// Styles
import './TodoForm.css';

//c React Hooks
export default function TodoForm() {
  // useDispatch
  const dispatch = useDispatch();

  // useState и функции для его обработки
  const [message, setMessage] = useState('');

  const handleChange = useCallback(event => {
    setMessage(event.currentTarget.value);
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      // проверка на пустую строку. Код выполнится в случае сли пользователь не отправляет пустую строку
      if (message === '') {
        return alert('Нужно ввести текст заметки!');
      }

      dispatch(todosOperations.addTodo(message)); // useDispatch

      setMessage(''); // reset для очищения textarea
    },
    [dispatch, message],
  );

  return (
    <form className="TodoEditor" onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={handleChange}
        className="TodoEditor__textarea"
      ></textarea>

      <button type="submit" className="TodoEditor__button">
        Add
      </button>
    </form>
  );
}

// без React Hooks
// class TodoForm extends Component {
//   state = {
//     message: '',
//   };

//   handleChange = event => {
//     this.setState({ message: event.currentTarget.value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     // console.log(this.state);

//     // проверка на пустую строку. Код выполнится в случае сли пользователь не отправляет пустую строку
//     if (this.state.message !== '') {
//       // вызов addTodo из Draft.js <Form onSubmit={this.formSubmitHandler};
//       this.props.onSubmit(this.state.message);

//       // reset для очищения textarea
//       this.setState({ message: '' });

//       return;
//     }
//     alert('Нужно ввести текст заметки!');
//   };

//   render() {
//     return (
//       <form className="TodoEditor" onSubmit={this.handleSubmit}>
//         <textarea
//           value={this.state.message}
//           onChange={this.handleChange}
//           className="TodoEditor__textarea"
//         ></textarea>

//         <button type="submit" className="TodoEditor__button">
//           Add
//         </button>
//       </form>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   onSubmit: text => dispatch(todosOperations.addTodo(text)),
// });

// export default connect(null, mapDispatchToProps)(TodoForm);
