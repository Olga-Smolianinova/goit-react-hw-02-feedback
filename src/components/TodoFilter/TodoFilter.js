import React from 'react';

import { useSelector, useDispatch } from 'react-redux'; //подключение к Redux

// Data
import { todosActions, todosSelectors } from '../../redux/todos'; //рефакторинг для сокращения прописывания пути, используя export {default} в index.js

// Styles
import './TodoFilter.css';

//c React Hooks
export default function TodoFilter() {
  // useSelector
  const value = useSelector(todosSelectors.getFilter);

  // useDispatch
  const dispatch = useDispatch();
  const onChange = e => dispatch(todosActions.changeFilter(e.target.value)); //можно обернуть в useCallback

  return (
    <label className="Filter">
      Фильтр по имени
      <input
        type="text"
        value={value}
        // c useDispatch
        onChange={onChange}
      />
    </label>
  );
}

// без React Hooks
// const TodoFilter = ({ value, onChange }) => (
//   <label className="Filter">
//     Фильтр по имени
//     <input type="text" value={value} onChange={onChange} />
//   </label>
// );

// const mapStateToProps = state => ({
//   // value: state.todos.filter, //без использования selectors
//   value: todosSelectors.getFilter(state), //с использованием selectors
// });

// const mapDispatchToProps = dispatch => ({
//   onChange: event => dispatch(todosActions.changeFilter(event.target.value)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
