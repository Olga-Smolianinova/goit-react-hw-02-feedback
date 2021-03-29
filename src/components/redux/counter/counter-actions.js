// чтобы при дублировании type  избежать опечатки и ошибки создаем counter-types удобства и избежания ошибок и подключаем их в этом файле в counter-actions.js
import actionTypes from '../counter/counter-types';

// ActionCreater (Фабрики действий) для Counter. Увеличение +1/Уменьшение -1 счетчика
export const increment = value => ({
  type: actionTypes.INCREMENT, //подключаем значение из файла counter-types, которое import из него как actionTypes
  payload: value,
});

export const decrement = value => ({
  type: actionTypes.DECREMENT, //подключаем значение из файла counter-types, которое import из него как actionTypes
  payload: value,
});
