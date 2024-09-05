import React, { useEffect, useState } from 'react';
// import { styles } from 'global';

const Card = ({children, delay=0, width, dataSource}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const cardStyle = `
    bg-white p-5 rounded-lg shadow-lg hover:shadow-xl
    transition-shadow duration-300 overflow-y-auto
    mb-4
    ${isVisible ? 'opacity-100' : 'opacity-0'}
  `;

  return (
    <div
      className={cardStyle}
      style={{
        transition: `opacity 1s ease ${delay}ms`,
        width: width || '400px'
      }}
    >
      <div>{children}</div>
      {dataSource && (
        <div className='border-t pt-3 mt-auto'>
          {dataSource.link ? (
            <div >
              <div className='text-sm inline-block'>Data Source:</div>
              <a
                className='inline-block text-blue-500 hover:underline text-sm pl-1'
                href={`https://${dataSource.link}`}
                rel='noopener noreferrer'
                target='_blank'
              >
                {dataSource.name}
              </a>
            </div>
          ) : (
            <p className='text-gray-500 text-sm'>Data Source: {dataSource.name}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;