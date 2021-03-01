import React from 'react';

// Components
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';

import Statistics from './components/Statistics/Statistics';

// Styles
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* 1. рендерим и вставляем часть кода из components/FeedbackOptions/FeedbackOptions.js */}
      <FeedbackOptions />

      {/* 2. рендерим и вставляем часть кода из components//Statistics/Statistics.js */}
      <Statistics />
    </div>
  );
};

export default App;
