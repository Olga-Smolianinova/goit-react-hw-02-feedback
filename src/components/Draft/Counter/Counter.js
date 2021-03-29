import React from 'react';

import { connect } from 'react-redux'; // Для того чтобы связать хранилище store и какой-либо компонент, он должен быть обернут в функцию connect()

import * as actions from '../../redux/counter/counter-actions'; //actions используются в mapDispatchToProps

// Components
import Value from './Value';

import s from './Counter.module.css';

// ==========WITH REDUX
// В параметрах деструктуризируем value и step из глобальный state, onIncrement/onDecrement - методы dsipftch из counter-actions.js
function Counter({ value, step, onIncrement, onDecrement }) {
  return (
    <div className={s.Counter}>
      <h2>Modul Training</h2>
      <h2>Counter</h2>

      {/* value - значение из state store.js, которое передается в  props компонента */}
      <Value value={value} />

      <button type="button" step={step} onClick={() => onIncrement(step)}>
        Увеличить на {step}
      </button>

      <button type="button" step={step} onClick={() => onDecrement(step)}>
        Уменьшить на {step}
      </button>
    </div>
  );
}
// При export default оборачиваем компонент в функцию connect(). Для того чтобы связать его с хранилищем store. Способ ()() - называется КАРИРОВАНИЕ -  connect() -эта часть настраивает связь между компонентом и REDUX) - и возвращает еще одну функцию, в вызов которой передаем (Counter)

// В connect() передается
//1) mapStateToProps - заMAPать props Redux из store.js в props Компонента;
const mapStateToProps = state => {
  return {
    value: state.counter.value, //из store.js
    step: state.counter.step, //из store.js
  };
};

// 2) mapDispatchToProps - функция, которая позволяет передать методы для отправки всех action; dispatch - метод, который доставляет все action до хранилища
const mapDispatchToProps = dispatch => {
  return {
    // в значении лежат функции, которые будут dispatch action  из redux/counter/counter-actions.js, файл импортируем вверху
    onIncrement: value => dispatch(actions.increment(value)),

    onDecrement: value => dispatch(actions.decrement(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

// Пример карирования:
// const a = x => {
//   return y => {
//     return x + y;
//   };
// };

// console.log(а(2)(3));
// а(2)(3); //5

//===========BEFORE REDUX
// class Counter прибиваем, т.к. state, handleIncrement, handleDecrement комментрируем, т.к. они находятся в папке components/redux/counter. Т.к. подключили из через Redux
// class Counter extends Component {
//   static defaultProps = {
//     initialValue: 0,
//   };

//   state = {
//     value: this.props.initialValue,
//   };

//   handleIncrement = () => {
//     this.setState(prevState => ({
//       value: prevState.value + 1,
//     }));
//   };

//   handleDecrement = () => {
//     this.setState(prevState => ({
//       value: prevState.value - 1,
//     }));
//   };

//   render() {
//     return (
//       <div className={s.Counter}>
//         <h2>Modul Training</h2>
//         <h2>Counter</h2>
//         <button type="button">Counter value {this.state.value}</button>
//         <button type="button" onClick={this.handleIncrement}>
//           Увеличить на 1
//         </button>
//         <button type="button" onClick={this.handleDecrement}>
//           Уменьшить на 1
//         </button>
//       </div>
//     );
//   }
// }

// export default Counter;
