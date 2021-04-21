import React, { useState, useEffect } from 'react'; // useState - использование state; useEffect - позволяет заменить Жизненные циклы (cdm, cdu, cwu) - первый рендер; каждый рендер; каждый рендер при изменении какого-то элемента state или props; последний рендер

const styles = {
  btn: {
    display: 'inline-flex',
    fontSize: 20,
    margin: 4,
    cursor: 'pointer',
  },
};

// c React Hooks
export default function Counter() {
  const [counterA, setCounterA] = useState(0); // вызов useState - возвращает массив, который деструктуризируем, где 0 элемент - ссылка на самое состояние, а 1 элемент - updater (такой себе setState только для hooks), который используем только для этой части обновления состояния

  const handleCounterAIncrement = () => {
    setCounterA(prevCounterA => prevCounterA + 1);
  };

  // hooks не сливают state. Для каждого свойства свой hook
  const [counterB, setCounterB] = useState(0);

  const handleCounterBIncrement = () => {
    setCounterB(prevCounterB => prevCounterB + 1);
  };

  // useEffect - анонимная функция, которая будет вызываться каждый раз, когда обновляется компонент. Если необходимо вызвать  useEffect только один раз на первом рендере (как cdm), в этом случаем 2-м аргументом будет массив зависимостей (то, от чего будет зависеть этот компонент; при изменении каких данных этот эффект будет происходить)
  useEffect(() => {
    document.title = `Кликнули ${counterA + counterB} раз`;
  }, [counterA, counterB]); //[] - пустой массив означает, что массив заисимостей пуст, т.е. эффект выполнится только один раз и больше никогда. При таком синтаксисе аналогия cdm  //если в body функции указан какй-либо элемент state или props - в массиве зависимостей он должен дублироваться. В этом случае useEffect будет выполняться только в том случае если изменится эта часть state или props и каждый раз, когда изменится указанное значение (cdu + не нужно делать дополнительные проверки)

  return (
    <>
      <button
        style={styles.btn}
        type="button"
        onClick={handleCounterAIncrement}
      >
        Кликнули counterA {counterA} раз
      </button>

      <button
        style={styles.btn}
        type="button"
        onClick={handleCounterBIncrement}
      >
        Кликнули counterB {counterB} раз
      </button>
    </>
  );
}

// без React Hooks
// class Counter extends Component {
//   state = {
//     counterA: 0,
//     counterB: 0,
//   };

//   handleCounterAIncrement = () => {
//     this.setState(({ counterA }) => ({ counterA: counterA + 1 }));
//   };

//   handleCounterBIncrement = () => {
//     this.setState(({ counterB }) => ({ counterB: counterB + 1 }));
//   };

//   componentDidMount() {
//     const { counterA, counterB } = this.state;
//     const totalClicks = counterA + counterB;

//     document.title = `Кликнули ${totalClicks} раз`; //document.title - отображение в верхней панели экрана
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { counterA, counterB } = this.state;

//     if (prevState.counterA !== counterA || prevState.counterB !== counterB) {
//       const totalClicks = counterA + counterB;

//       document.title = `Кликнули ${totalClicks} раз`;
//     }
//   }

//   render() {
//     return (
//       <>
//         <button
//           style={styles.btn}
//           type="button"
//           onClick={this.handleCounterAIncrement}
//         >
//           Кликнули counterA {this.state.counterA} раз
//         </button>

//         <button
//           style={styles.btn}
//           type="button"
//           onClick={this.handleCounterBIncrement}
//         >
//           Кликнули counterB {this.state.counterB} раз
//         </button>
//       </>
//     );
//   }
// }

// export default Counter;
