import React from 'react';
import TextPage from 'components/textPage';
import aboutText from 'static/aboutText';

const About = () => (
  <TextPage uninterpolatedText={aboutText}/>
);

export default About;
