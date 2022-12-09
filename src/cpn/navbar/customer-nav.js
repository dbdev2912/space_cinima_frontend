import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default () =>{
    const dispatch = useDispatch()

    const credential = useSelector( (state) => state.credential );
    const customer_info = useSelector( (state) => state.customer_info );

    const [ drawer, setDrawer ] = useState(0);

    const signoutRequest = () =>{
        fetch('/api/signout').then( res => res.json() ).then( (data) => {
            window.location = '/login';
        })
    }

    return(
        <div className="navbar">
            <div className="nav-items">

                <div className="item">
                    <div className="navigator" onClick={ ()=>{ setDrawer( !drawer ) } }>
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
                <div className="item">
                    <div className="logo">
                        <div className="img-container">
                            <img src="/images/logo.jpg"/>
                        </div>
                        <span className="title">Space Cinema</span>
                    </div>
                </div>

                <div className="item">
                    <div className="sign-out" onClick = { signoutRequest }>
                        <img src="/images/utils/signout.png"/>
                    </div>
                </div>

            </div>
            { credential.session ?
            <div className={"drawer " + (drawer ? "drawer-show" : "drawer-hidden")} style={{ zIndex: drawer ? 3 :1 }}>
                <div className="drawer-box">
                    <div className="drawer-container">

                        <div className="user-box">
                            <div className="user-image">
                                <div className="image-frame">
                                    <img src="/images/user/default.png" />
                                </div>
                            </div>
                            <div className="user-info">
                                <span className="name">{customer_info.fullname}</span>
                                <span className="email">{customer_info.email}</span>
                            </div>
                            <div className="close-toggle" onClick={ ()=>{ setDrawer( !drawer ) } }>
                                <span />
                            </div>
                        </div>

                        <div className="menu-list">
                            <div className="items">
                                <div className="item">
                                    <a href="/films" className="link">Latest films</a>
                                </div>
                                <div className="item">
                                    <a href="/categories" className="link">Category</a>
                                </div>
                                <div className="item">
                                    <a href="/qrcanner" className="link">QR Checkin</a>
                                </div>
                                <hr/>
                                <div className="item">
                                    <a href="/settings" className="link">Setting</a>
                                </div>
                                <div className="item">
                                    <a href="/help" className="link">Help</a>
                                </div>
                                <hr/>
                                <div className="item">
                                    <a href="/about" className="link">About</a>
                                </div>
                                <div className="item">
                                    <a href="/contact" className="link">Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fake-bg" onClick={ ()=>{ setDrawer( !drawer ) } }/>
            </div>
            : null }

        </div>
    )
}
