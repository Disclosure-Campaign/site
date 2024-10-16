import React from 'react';
import TextPage from 'components/textPage';
import contactText from 'static/contactText';

const ContactPage = () => (
  <TextPage {...{uninterpolatedText: contactText, hideTOC: true, hideExpander: true}}/>
);

export default ContactPage;