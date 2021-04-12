import { createSelector } from '@reduxjs/toolkit'; //создание мемоизиронного селектора

// даже если в компонентах нигде не используется, имеет смысл получить доступ для удобства и переспользвания ко всему массиву todos. Для этого создаем вспомогательный селектор
const getAllTodos = state => state.todos.items;

// Рефакторинг из Draft.js ( mapStateToProps). Принимает весь state. Возвращает только необходимую, малую часть - state.todos.loading
const getLoading = state => state.todos.loading;

// Рефакторинг из TodoFilter.js ( mapStateToProps)
const getFilter = state => state.todos.filter;

// Рефакторинг из Statictics.js ( mapStateToProps)
const getTotalTodoCount = state => {
  // доступ ко всем todos
  const todos = getAllTodos(state);
  return todos.length;
};

// c применением мемоизиронного селектора. В createSelector 1 аргумент - передаю буквально ссылку на те значения, от которых зависит мемоизация; 2 - перадаю функцию, которая непосредственно будет делать вычисления. В нее аргументами поступает результат вызова функций из аргумента 1
const getCompletedTodosCount = createSelector([getAllTodos], todos => {
  //   Тело этой функции выполнится только в том случае, если изменится или todos. Т.е. todos - кешируется. Если из предыдущего вызова todos не изменился - то return... не произойдет, функция из кеша вернет старый готовый массив, который там хранится как последняя выполненная операция
  return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
});

// без применения мемоизиронного селектора
// const getCompletedTodosCount = state => {
//   const todos = getAllTodos(state);

//   return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
// };

// Рефакторинг из TodoList.js ( mapStateToProps)
// метод для отображения по фильтру.   Отфильтровываем те todos, которые includes то, что мы записали в input Фильтр по имени и в TodoList рендерим не все <TodoList
//   todos={todos}, а только отфильтрованые, т.е.  todos={filteredTodos}
// />
// const getFilteredTodos = (allTodos, filter) => {
//
//   const normalizedFilter = filter.toLowerCase();

//   return allTodos.filter(todo =>
//     todo.text.toLowerCase().includes(normalizedFilter),
//   );
// };

// Это композитный, составной селектор. Рефакторим метод getFilteredTodos, который использовали до применения selectors

// c применением мемоизиронного селектора.
const getFilteredTodos = createSelector(
  [getAllTodos, getFilter],
  (todos, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(({ description }) =>
      description.toLowerCase().includes(normalizedFilter),
    );
  },
);

// без применения мемоизиронного селектора
// const getFilteredTodos = state => {
//   const todos = getAllTodos(state); //доступ ко всем todos
//   const filter = getFilter(state); //доступ к filter
//   const normalizedFilter = filter.toLowerCase();

//   return todos.filter(({ text }) =>
//     text.toLowerCase().includes(normalizedFilter),
//   );
// };

// Рефакторинг из Statictics.js ( mapStateToProps)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getLoading,
  getFilter,
  getFilteredTodos,
  getTotalTodoCount,
  getCompletedTodosCount,
};
