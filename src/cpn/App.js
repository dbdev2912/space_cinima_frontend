import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';

import Login from './portal';
import Navbar from './navbar/customer-nav';


import '../css/index.scss';

function App() {
  return (
        <div>
            <Router>
                <Routes>
                    <Route exac path = '/login' element={
                        <React.StrictMode>
                            <Login />
                        </React.StrictMode>
                    }/>
                    <Route exac path = '/' element={
                        <React.StrictMode>
                            <Navbar />
                            <h1>Home</h1>
                        </React.StrictMode>
                    }/>
                    <Route exac path = '/about' element={
                        <React.StrictMode>
                            <h1>About</h1>
                        </React.StrictMode>
                    }/>
                </Routes>
            </Router>
        </div>
  );
}

export default App;
