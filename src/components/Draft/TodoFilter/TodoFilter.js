import React from 'react';

import { connect } from 'react-redux'; //подключение к Redux

import todosActions from '../../redux/todos/todos-actions';

import './TodoFilter.css';

const TodoFilter = ({ value, onChange }) => (
  <label className="Filter">
    Фильтр по имени
    <input type="text" value={value} onChange={onChange} />
  </label>
);

const mapStateToProps = state => ({
  value: state.todos.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(todosActions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
