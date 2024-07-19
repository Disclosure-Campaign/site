import React from 'react';
import { styles } from 'global';

const Card = ({ title, description }) => (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <button className={`${styles.button} mt-4 px-4 py-2 rounded-lg`}>
            Click Me
        </button>
    </div>
);

export default Card;

// not correct at all yet