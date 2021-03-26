import { createStore } from 'redux';

// Создание редюсер-болванки
// const reducer = (state = {}, action) => state;
// const store = createStore(reducer);

// Для Counter редюсер стартовое значение
const initialState = {
  counterValue: 0,
};

// reducer для 2-х actions: increment/decrement счетчика. Reducer различает их по свойству type. В параметрах деструктуризируем action. До - (state = initialState, action). После - ...
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Условия reducer, при совпадении type, выполнять указанный код
    case 'counter/Increment':
      //   на базе предыдущего state вернуть следующий state
      return {
        counterValue: state.counterValue + payload,
      };

    case 'counter/Decrement':
      return {
        counterValue: state.counterValue - payload,
      };

    //   нужно default поведение reducer, если case ниодин не совпал
    default:
      return state;
  }
};

// Для того чтобы создать хранилище, используется функция createStore, которая принимает набор параметров и возвращает созданное хранилище.
const store = createStore(reducer);

export default store;

// Для подключение  Counter  к Redux. Необходим пакет react-redux, из которого достаем  Provider - компонент, который оборачивает все наше приложение, он ставится поверх App, и он через контекст (контекст - это глобальная переменная) может прокидывать в глубину и на любую вложенность дополнительный функционал.
