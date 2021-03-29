// чтобы при дублировании type из counter-actions  избежать опечатки и ошибки создаем counter-types удобства и избежания ошибок и переиспользовать их будем в counter-actions.js
const INCREMENT = 'counter/Increment';

const DECREMENT = 'counter/Decrement';

// eslint-disable-next-line import/no-anonymous-default-export
export default { INCREMENT, DECREMENT };
