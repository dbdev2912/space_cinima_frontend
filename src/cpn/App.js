import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './portal';

import Navbar from './navbar/customer-nav';
import LatestFilms from './user/latestfilms';
import FilmDetail from './user/filmdetail';
import Categories from './user/categories';

import AdminHome from './admin/index';
import AdminNavbar from './navbar/admin-nav';
import AdminFilms from './admin/films';
import AdminFilmCreate from './admin/filmcreate';


import AdminCates from './admin/cates';
import AdminCatesCreate from './admin/catescreate';

import axios from 'axios';

import '../css/index.scss';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/api/session/retrieve')
        .then( res => res.json() )
        .then( (data) =>{

            const { sessionCredential, customer_info, session } = data;
            sessionCredential.session = session;
            dispatch({
                type: 'session/retrieve',
                payload: { sessionCredential, customer_info},
            })
        } )
    }, []);

    return (
        <div>
            <Router>
                <Routes>
                    <Route exac path = '/login' element={
                        <React.StrictMode>
                            <Login />
                        </React.StrictMode>
                    }/>

                    {/* CUSTOMER ROUTER */}

                    <Route exac path = '/' element={
                        <React.StrictMode>
                            <Navbar />
                            <h1>Home</h1>
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/films' element={
                        <React.StrictMode>
                            <Navbar />
                            <LatestFilms />
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/film/:id' element={
                        <React.StrictMode>
                            <Navbar />
                            <FilmDetail />
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/categories' element={
                        <React.StrictMode>
                            <Navbar />
                            <Categories />
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/about' element={
                        <React.StrictMode>
                            <Navbar />
                            <h1>About</h1>
                        </React.StrictMode>
                    }/>




                    {/* ADMIN ROUTER */}

                    <Route exac path = '/admin' element={
                        <React.StrictMode>
                            <AdminNavbar />
                            <AdminHome />
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/admin/films' element={
                        <React.StrictMode>
                            <AdminNavbar />
                            <AdminFilms />
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/admin/categories' element={
                        <React.StrictMode>
                            <AdminNavbar />
                            <AdminCates />
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/admin/film/create' element={
                        <React.StrictMode>
                            <AdminNavbar />
                            <AdminFilmCreate />
                        </React.StrictMode>
                    }/>

                    <Route exac path = '/admin/categories/create' element={
                        <React.StrictMode>
                            <AdminNavbar />
                            <AdminCatesCreate />
                        </React.StrictMode>
                    }/>

                </Routes>
            </Router>
        </div>
  );
}

export default App;
