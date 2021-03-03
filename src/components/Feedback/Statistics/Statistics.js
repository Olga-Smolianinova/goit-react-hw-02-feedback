import React from 'react';

const Statistics = ({ good, neutral, bad }) => (
  <div>
    <ul>
      <h2>Statistics</h2>

      <li>Good: {good}</li>
      <li>Neutral: {neutral}</li>
      <li>Bad: {bad}</li>

      {/* рендер по условию */}
      {good > 0 && (
        <>
          <li>Total: </li>
          <li>Positive feedback: </li>
        </>
      )}
    </ul>
  </div>
);

export default Statistics;
