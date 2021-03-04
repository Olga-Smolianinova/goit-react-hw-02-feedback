import React from 'react';

const Section = ({ title, children }) => {
  return (
    <section className="Section">
      <h2 className="Title">{title}</h2>
      {children}
    </section>
  );
};

export default Section;
