import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Login from './pages/Login';
import Chat from './pages/Chat';
import './App.css';

function App() {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return (
            <div className="app">
                <div className="app__loading">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    const PrivateRoute = ({ children }) => {
        return keycloak.authenticated ? children : <Navigate to="/login" />;
    };

    return (
        <div className="app">
            <div className="app__body">
                <Router>
                    <Routes>
                        <Route
                            path="/login"
                            element={keycloak.authenticated ? <Navigate to="/" /> : <Login />}
                        />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Chat />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
