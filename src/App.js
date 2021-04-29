import React, { useState } from 'react';

// Components
// import Feedback from './components/Feedback';
import Section from './components/Section';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';
import Notification from './components/Notification';

//  c React Hooks
export default function App() {
  // useState
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // function
  const countFeedback = event => {
    const btnName = event.target.textContent.toLowerCase();

    switch (btnName) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        console.warn(`Тип поля name - ${btnName} не обрабатывается`);
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () =>
    Math.round((good * 100) / countTotalFeedback());

  return (
    <div className="Feedback">
      {/*1. title выносим в отдельный component 
        /* 2.  внутрь Section рендерим и вставляем часть кода из ./FeedbackOptions.js */}
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{ good, neutral, bad }}
          onLeaveFeedback={countFeedback}
        />
      </Section>

      {/*3. title выносим в отдельный component
        4. внутрь Section рендерим и вставляем часть кода из ./Statistics.js */}
      <Section title="Statistics">
        {/* рендер по условию: если есть хотя бы 1 отзыв выведи всю статистику, в обратном случае - надпись No feedback given' */}
        {countTotalFeedback() !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </div>
  );
}
