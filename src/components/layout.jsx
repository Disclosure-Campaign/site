import React from 'react';
import Header from './header';

const Layout = ({ children }) => (
    <div>
        <Header />
        <main className="container mx-auto p-4">
            {children}
        </main>
    </div>
);

export default Layout;