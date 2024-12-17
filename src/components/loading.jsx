import React from 'react';

// import { styles } from 'global';

const Loading = ({height='h-32', width='w-32', fullScreen=false}) => {
  const containerStyle = `flex justify-center items-center ${fullScreen ? 'h-screen' : 'h-full'}`
  const spinnerStyle = `animate-spin rounded-full ${height} ${width} border-t-2 border-b-2 border-emerald-600`;

  return (
    <div className={containerStyle}>
      <div className={spinnerStyle}/>
    </div>
  );
};

export default Loading;