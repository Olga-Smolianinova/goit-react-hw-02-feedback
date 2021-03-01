import React from 'react';

class Statistics extends React.Component {
  //   static defaultProps = {
  //     good: this.defaultProps.good,
  //   };
  // static propTypes ={}

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  render() {
    return (
      <div>
        <h2>Statistics</h2>
        <p>Good:</p>
        <p>Neutral:</p>
        <p>Bad:</p>
      </div>
    );
  }
}
export default Statistics;
