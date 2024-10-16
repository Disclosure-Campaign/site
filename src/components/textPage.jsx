import React, { useState } from 'react';
import _ from 'lodash';

const TextPage = ({uninterpolatedText, hideTOC, hideExpander}) => {
  const [hiddenSections, setHiddenSections] = useState({});

  const toggleSection = index => {
    setHiddenSections(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const scrollToSection = index => {
    const section = document.getElementById(`section-${index}`);
    section.scrollIntoView({behavior: 'smooth'});
  };

  const interpolateText = text => {
    const regex = /(\[\[(.*?)\]\]|\(\((.*?)\)\))/g;
    const paragraphs = text.split('\n\n');

    return _.map(paragraphs, (paragraph, paragraphIndex) => {
      const parts = [];
      var lastIndex = 0;
      var match;

      while ((match = regex.exec(paragraph)) !== null) {
        parts.push(paragraph.slice(lastIndex, match.index));

        if (match[2]) {
          parts.push(
            <span
              // onClick={() => console.log(`Show glossary for ${match[2]}`)}
              className='text-blue-500 hover:underline cursor-pointer'
              key={match.index}
            >
              {match[2]}
            </span>
          );
        }
        else if (match[3]) {
          var linkParts = match[3].split('|||');
          var linkText = linkParts[0];
          var url = linkParts[1];

          parts.push(
            <a
              href={_.includes(url, 'mailto:') ? url : `https://${url}`}
              className='text-blue-500 hover:underline'
              rel='noopener noreferrer'
              key={match.index}
              target='_blank'
            >
              {linkText}
            </a>
          );
        }

        lastIndex = match.index + match[0].length;
      }

      parts.push(paragraph.slice(lastIndex));

      return <p key={paragraphIndex} className="mb-4">{parts}</p>;
    });
  };

  return (
    <div className='w-screen md:h-full flex flex-col md:items-center overflow-auto bg-gray-100 p-8'>
      {!hideTOC && <div className='md:w-3/4 mb-10'>
        <h3 className='text-xl font-semibold mb-4 text-gray-800'>Table of Contents</h3>
        <ul className='space-y-2'>
          {_.map(uninterpolatedText, ({heading}, index) => (
            <li key={index}>
              <button
                className='text-blue-500 hover:underline'
                onClick={() => scrollToSection(index)}
              >
                {heading}
              </button>
            </li>
          ))}
        </ul>
      </div>}
      <div className='md:w-3/4'>
        {_.map(uninterpolatedText, ({heading, paragraph}, index) => {
          var isHidden = hiddenSections[index];

          return (
            <div key={index} id={`section-${index}`} className='mb-8'>
              {!hideExpander ? (
                <h2
                  className='text-2xl font-bold mb-4 text-gray-800 cursor-pointer'
                  onClick={() => toggleSection(index)}
                >
                  {heading} {isHidden ? '+' : '-'}
                </h2>
              ) : (
                <h2 className='text-2xl font-bold mb-4 text-gray-800'>
                  {heading}
                </h2>
              )}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isHidden ? 'max-h-0 opacity-0' : 'md:max-h-screen opacity-100'
                }`}
              >
                <div className='text-lg leading-relaxed text-gray-700'>
                  {interpolateText(paragraph)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextPage;
