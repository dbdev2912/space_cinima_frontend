import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default () =>{
    const dispatch = useDispatch()

    const [ drawer, setDrawer ] = useState(0);

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
                    <div className="sign-out">
                        <img src="/images/utils/signout.png"/>
                    </div>
                </div>

            </div>

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
                                <span className="name">Bành Thị Mộng Chè</span>
                                <span className="email">mongche@sakila.com</span>
                            </div>
                            <div className="close-toggle" onClick={ ()=>{ setDrawer( !drawer ) } }>
                                <span />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fake-bg" onClick={ ()=>{ setDrawer( !drawer ) } }/>
            </div>

        </div>
    )
}
