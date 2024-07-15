import React from 'react';

const Card = ({ title, description }) => (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 active:bg-blue-600">
            Click Me
        </button>
    </div>
);

export default Card;
