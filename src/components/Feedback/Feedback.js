import React, { Component } from 'react';

//Components
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';

import Statistics from './Statistics/Statistics';

class Feedback extends Component {
  // static defaultProps = {
  //   value: this.defaultProps.value,
  // };

  // static propTypes ={}

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  // методы
  countFeedback = () => {
    this.setState(prevState => ({
      good: prevState.good + 1,
      // neutral: prevState.neutral + 1,
      // bad: prevState.bad + 1,
    }));
  };

  countTotalFeedback = () => {
    //
  };

  countPositiveFeedbackPercentage = () => {
    //
  };

  // render
  render() {
    // для оптимизации кода деструктуризируем свойства state,чтобы каждый раз не писать this.state в Statistics
    const { good, neutral, bad } = this.state;

    return (
      <div>
        {/* 1. рендерим и вставляем часть кода из FeedbackOptions/FeedbackOptions.js */}
        <FeedbackOptions
          options={this.state}
          onLeaveFeedback={this.countFeedback}
        />

        {/* 2. рендерим и вставляем часть кода из ./Statistics/Statistics.js */}
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          // total={}
          // positivePercentage={}
        />
      </div>
    );
  }
}

export default Feedback;
