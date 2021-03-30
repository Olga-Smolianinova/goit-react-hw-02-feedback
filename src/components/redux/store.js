import { createStore, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension'; //для подлючения Redux devtools и настройки стека прослоек

// Reducers
import counterReducer from './counter/counter-reducer'; //reducer для Counter

import todosReducer from './todos/todos-reducer'; // reducer для todos в TodoList

// Создание редюсер-болванки
// const reducer = (state = {}, action) => state;
// const store = createStore(reducer);

// Для каждого объекта в глобальном state свой отдельный Reducer. И внизу этого файла есть корневой редьюсер (rootReducer), где ключ - это название компонента со state для него, а значение - редьюсер, который отвечает за него

// ДО counterReducer для 2-х actions: increment/decrement счетчика. Reducer различает их по свойству type. В параметрах деструктуризируем action. До - (state = initialState, action). После - ...
// const counterReducer = (state = counterInitialState, { type, payload }) => {
//   switch (type) {
//     // Условия reducer, при совпадении type, выполнять указанный код
//     case 'counter/Increment':
//       //   на базе предыдущего state вернуть следующий state.
//       return {
//         // т.к. разделили общий state на отдельные кусочки, вынесли отдельно counterInitialState, распыляем весь state, чтобы сохранить step и указываем значение value
//         ...state,
//         value: state.value + payload,

//         // если есть дополнительные сложенности в объекте. Берем весь state, распыляем предыдущее состояние, а в counter - распыляем предыдущий state.counter (для того чтобы получить данные других ключей, например step), а его свойство value запиши: state.counter.value + payload
//         // ...state,
//         // counter: {
//         //   ...state.counter,
//         //   value: state.counter.value + payload,
//         // },
//         // если нет дополнительных вложенностей в объекте
//         // counterValue: state.counterValue + payload,
//       };

//     case 'counter/Decrement':
//       return {
//         // 1
//         ...state,
//         value: state.value - payload,

//         // 2
//         // ...state,
//         // counter: {
//         //   ...state.counter,
//         //   value: state.counter.value - payload,
//         // },
//         // counterValue: state.counterValue - payload,
//       };

//     //   нужно default поведение reducer, если case ниодин не совпал
//     default:
//       return state;
//   }
// };

//  В корневой редюсер вызываем combineReducers - полезная функция Redux - возможность делать композицию редьюсеров, то есть совмещать много в один. Это позволяет удобно поддерживать гораздо более сложные состояния в больших приложениях. И в свойстве counter находится редьюсер, который отвечает за него
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

// Для того чтобы создать хранилище, используется функция createStore, которая принимает набор параметров и возвращает созданное хранилище. composeWithDevTools - //для подлючения Redux devtools и настройки стека прослоек
const store = createStore(rootReducer, composeWithDevTools());

export default store;
