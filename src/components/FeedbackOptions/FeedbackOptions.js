import React from 'react';

class FeedbackOptions extends React.Component {
  // static defaultProps={}
  // static propTypes ={}

  render() {
    return (
      <div>
        <h2>Please leave feedback</h2>
        <button
          type="button"
          onClick={() => {
            console.log('Click Good-button');
          }}
        >
          Good
        </button>
        <button type="button">Neutral</button>
        <button type="button">Bad</button>
      </div>
    );
  }
}
export default FeedbackOptions;
