import React from 'react';
import TextPage from 'components/textPage';
import aboutText from 'static/aboutText';

const About = () => (
  <div>
    <TextPage uninterpolatedText={aboutText}/>
    <div>Version 1.2</div>
  </div>
);

export default About;
