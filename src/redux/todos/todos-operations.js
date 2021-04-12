import axios from 'axios'; //для fetch запросов

import actions from './todos-actions'; //синхронные actions

// GET @ /tasks
const fetchTodos = () => async dispatch => {
  // для обработки request при старте. Просто отправляем  type (без payload), который затягиваем из todos-actions.js, для того, чтобы можно было поставить флажок загрузки
  dispatch(actions.fetchTodosRequest());

  try {
    const { data } = await axios.get('/tasks');
    // по результату делаем dispatch
    dispatch(actions.fetchTodosSuccess(data));
  } catch (error) {
    dispatch(actions.fetchTodosError(error.message));
  }

  // вариант без async await
  // dispatch(actions.fetchTodosRequest());

  //   axios
  //     .get('/tasks')
  //     .then(({ data }) => dispatch(actions.fetchTodosSuccess(data)))
  //     .catch(error => dispatch(actions.fetchTodosError(error.message)));
};

// ADD task. // POST @ /tasks
const addTodo = description => dispatch => {
  // здесь делаем http-запрос и по результату dispatch выполняются синхронные actions, т.е результаты http-запроса, которые отправляем с данными дальше по цепочке
  const todo = {
    description,
    completed: false,
  };

  dispatch(actions.addTodoRequest());

  axios
    .post('/tasks', todo)
    // и данные нужно dispatch как объект action. Прописываем dispatch в случаем успеха - это вызываем из actions метод addTodoSuccess, а payload - прокидываем data в   и в случае ошибки(error)
    .then(({ data }) => dispatch(actions.addTodoSuccess(data)))
    .catch(error => dispatch(actions.addTodoError(error.message)));
};

// DELETE task. // DELETE @ /tasks/:id
const deleteTodo = todoId => dispatch => {
  dispatch(actions.deleteTodoRequest());

  axios
    .delete(`tasks/${todoId}`)
    .then(() => dispatch(actions.deleteTodoSuccess(todoId)))
    .catch(error => dispatch(actions.deleteTodoError(error.message)));
};

//TOGGLE_COMPLETED -  checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
// PATCH @ /tasks/:id
const toggleCompleted = ({ id, completed }) => dispatch => {
  const update = { completed };

  dispatch(actions.toggleComletedRequest());

  // для toggleCompleted прописывываем метод для обновления.  параметр update - {completed: !completed}
  axios
    .patch(`/tasks/${id}`, update)
    .then(({ data }) => dispatch(actions.toggleComletedSuccess(data)))
    .catch(error => dispatch(actions.toggleComletedError(error.message)));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleCompleted,
};
