// ActionCreater (Фабрики действий) для Counter. Увеличение +1/Уменьшение -1 счетчика
export const increment = value => ({
  type: 'counter/Increment',
  payload: value,
});

export const decrement = value => ({
  type: 'counter/Decrement',
  payload: value,
});
