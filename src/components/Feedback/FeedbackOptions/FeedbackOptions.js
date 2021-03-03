import React from 'react';

// import Statistics from './components/Statistics/Statistics';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  // т.к. state - объект, обработаем его с помощью метода Object.keys, и далее ключи выведем с помощью map
  const buttons = Object.keys(options);

  return (
    <div>
      <h2>Please leave feedback</h2>

      {buttons.map(button => (
        <button type="button" key={button} onClick={onLeaveFeedback}>
          {/*рендерим button, приведя сначала к  Заглавной букве название кнопки */}
          {button.toUpperCase().slice(0, 1) + button.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FeedbackOptions;
