import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { UserProvider } from './components/User/UserContext';
import './custom.css';
import Layout from './components/Layout';

const App = () => {
    return (
        <UserProvider>
        <Layout>

                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>

        </Layout>
                    </UserProvider >
    );
};

export default App;
