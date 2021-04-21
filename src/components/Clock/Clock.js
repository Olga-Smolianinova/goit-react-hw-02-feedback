import React, { useState, useEffect, useRef } from 'react'; //useRef -  если необходимо, чтобы между разными рендерами была какая-то стабильная переменная, не меняющая своего значения после каждого рендера - для это используем hook useRef. (т.к. если создавать логальную переменную внутри функции, она будет перезаписываться каждый раз и ее значения не сохраняются - это не тот результат, который нужен)

const styles = {
  clockface: {
    fontSize: 64,
    fontWeight: 500,
    textAlign: 'center',
  },
};

export default function Clock() {
  const [time, setTime] = useState(new Date());

  // useRef - если необходимо, чтобы между разными рендерами была какая-то стабильная переменная, не меняющая своего значения после каждого рендера - для это используем hook useRef. (т.к. если создавать логальную переменную внутри функции, она будет перезаписываться каждый раз и ее значения не сохраняются - это не тот результат, который нужен)
  const intervalId = useRef(); //useRef - это объект со свойством current, по умолчание - с пустым значением

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime(new Date());
    }, 1000); //в свойство current useRef записываем ссылку на наш timer

    //аналог componentWillUnmount() для того, чтобы остановить действие setInterval(), или когда переходим на другую страницу - для этого внутри  useEffect() нужно return еще одну функцию - функцию очистки, которая вызывается перед последним рендером
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  // метод для остановки timer
  const stop = () => {
    // 1 вариант
    clearInterval(intervalId.current);

    // или 2 вариант
    // stop()
  };

  return (
    <>
      <p style={styles.clockface}>Текущее время: {time.toLocaleTimeString()}</p>

      <button type="button" onClick={stop}>
        Stop
      </button>
    </>
  );
}

// class Clock extends Component {
//   state = {
//     time: new Date(),
//   };

//   intervalId = null;

//   componentDidMount() {
//     this.intervalId = setInterval(() => {
//       this.setState({ time: new Date() });
//     }, 1000);
//   }

//   componentWillUnmount() {
//     this.stop();
//   }

//   stop = () => {
//     clearInterval(this.intervalId);
//   };

//   render() {
//     return (
//       <>
//         <p style={styles.clockface}>
//           Текущее время: {this.state.time.toLocaleTimeString()}
//         </p>

//         <button type="button" onClick={this.stop}>
//           Stop
//         </button>
//       </>
//     );
//   }
// }

// export default Clock;
