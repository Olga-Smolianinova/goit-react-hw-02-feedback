import axios from 'axios'; //для fetch запросов

import actions from './todos-actions'; //синхронные actions

// baseURL
axios.defaults.baseURL = `http://localhost:4040`;

// т.к. при http-запросе обрабатывается логика при старте, успешном получении данных и в случае ошибки - создаем отдельных файл для таких операций

//Для  http-запроса нужен такой actionCreater, который при своем вызове возвращает не объект, а еще одну функцию (dispatch). Прослойка вызывает эту функцию dispatch(asyncActionCreater());
// const asyncActionCreater = args => dispatch => {
//   // здесь делаем http-запрос и по результату dispatch выполняются синхронные actions, т.е результаты http-запроса отправляем с данными
//   // fetch()
//   //   .then(x => dispatch(aaa(x)))
//   //   .catch(y => dispatch(yyy(y)));
// };

// перезаписываем addTodo так, чтобы отправить  http-запрос на локальный бекенд - db.json (http://localhost:4040/todos). Передаем text, который вернет dispatch (dispatch вызовет thunk под капотом)

// Асинхронные шаги будут все прописаны в этом файле
// fetch запрос. Для тренировки пропишем с async await
const fetchTodos = () => async dispatch => {
  // для обработки request при старте. Просто отправляем  type (без payload), который затягиваем из todos-actions.js, для того, чтобы можно было поставить флажок загрузки
  dispatch(actions.fetchTodosRequest());

  try {
    const { data } = await axios.get('/todos');
    // по результату делаем dispatch
    dispatch(actions.fetchTodosSuccess(data));
  } catch (error) {
    dispatch(actions.fetchTodosError(error));
  }

  // вариант без async await
  // dispatch(actions.fetchTodosRequest());

  //   axios
  //     .get('/todos')
  //     .then(({ data }) => dispatch(actions.fetchTodosSuccess(data)))
  //     .catch(error => dispatch(actions.fetchTodosError(error)));
};

// ADD todo. для добавления todo
const addTodo = text => dispatch => {
  // здесь делаем http-запрос и по результату dispatch выполняются синхронные actions, т.е результаты http-запроса, которые отправляем с данными дальше по цепочке
  const todo = {
    text,
    completed: false,
  };

  dispatch(actions.addTodoRequest());

  axios
    .post('/todos', todo)
    // и данные нужно dispatch как объект action. Прописываем dispatch в случаем успеха - это вызываем из actions метод addTodoSuccess, а payload - прокидываем data в   и в случае ошибки(error)
    .then(({ data }) => dispatch(actions.addTodoSuccess(data)))
    .catch(error => dispatch(actions.addTodoError(error)));
};

// DELETE todo
const deleteTodo = todoId => dispatch => {
  dispatch(actions.deleteTodoRequest());

  axios
    .delete(`todos/${todoId}`)
    .then(() => dispatch(actions.deleteTodoSuccess(todoId)))
    .catch(error => dispatch(actions.deleteTodoError(error)));
};

//TOGGLE_COMPLETED -  checkbox когда хотим что-либо обновить в коллекции, не изменяя ее длины. Сравниваем по идентификаторам, если совпало - заменяем, если нет - возвращается то, что было
const toggleCompleted = ({ id, completed }) => dispatch => {
  const update = { completed };

  dispatch(actions.toggleComletedRequest());

  // для toggleCompleted прописывываем метод для обновления.  параметр update - {completed: !completed}
  axios
    .patch(`/todos/${id}`, update)
    .then(({ data }) => dispatch(actions.toggleComletedSuccess(data)))
    .catch(error => dispatch(actions.toggleComletedError(error)));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleCompleted,
};
