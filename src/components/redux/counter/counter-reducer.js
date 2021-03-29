import { combineReducers } from 'redux'; //combineReducers - полезная функция Redux - возможность делать композицию редьюсеров, то есть совмещать много в один. Это позволяет удобно поддерживать гораздо более сложные состояния в больших приложениях.

import actionTypes from '../counter/counter-types'; //подключаем значение из файла counter-types, которое import из него как actionTypes

// Отдельно редьюсер для value, в state - указываем како-либо базовое значение:
const valueReducer = (state = 10, { type, payload }) => {
  switch (type) {
    // Условия reducer, при совпадении type, выполнять указанный код. Подключаем значение из файла counter-types, которое import из него как actionTypes
    case actionTypes.INCREMENT:
      //   на базе предыдущего state вернуть следующий state. т.к. разделили общий state на отдельные кусочки, дробим state, создаем отдельно редьюсер  для  value и step
      return state + payload;

    // Подключаем значение из файла counter-types, которое import из него как actionTypes
    case actionTypes.DECREMENT:
      return state - payload;

    //   нужно default поведение reducer, если case ниодин не совпал
    default:
      return state;
  }
};

// Отдельно редьюсер для step, в state - указываем како-либо базовое значение:
const stepReducer = (state = 5, action) => {
  return state;
};

// т.к. раздробили и вынесли отдельно редьюсеры для value и step, то в общий редьюсер для всего counter вызываем combineReducers.  И в свойстве value/step находится редьюсер, который отвечает за него. И выносим его в store.js для переиспользования как counterReducer
export default combineReducers({
  value: valueReducer,
  step: stepReducer,
});
