import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const submitRequest = async () =>{
        if( username && password ){
            const response = await axios.post('/api/login', {
                username, password
            }, { cors: true });

            const { success, location } = response.data
            if( success ){
                window.location = location;
            }
            else{
                alert("Something went wrong!")
            }
        }
    }

    return(
        <div className="login">
            <div className="login-form">
                <div className="form-header">
                    <div className="img-container">
                        <img src="/images/logo.jpg"/>
                    </div>
                    <span className="form-title">Space Cinema</span>
                </div>
                <div className="curve" />
                <div className="form-field">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); }} spellCheck="false"/>
                </div>
                <div className="form-field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); }} spellCheck="false"/>
                </div>
                <div className="form-field">
                    <button className="submit-btn" onClick={ submitRequest }>Let's go</button>
                </div>
                <div className="curve" />
            </div>
        </div>
    )
}
