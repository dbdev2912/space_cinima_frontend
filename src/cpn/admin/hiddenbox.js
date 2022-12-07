import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import FloatingListItem from './floating_list_item';

export default (props) => {
    const { categories, catChosing, submitChosen } = props;

    useEffect(() => {

        const height = $('#box').height() - $('#header').height();
        $('#scroll-box').css({
            height: `${height - 25}px`,
        })
    }, [])

    return(
        <div className="floating-box">
            <div className="box" id = "box">
                <div className="header" id = "header">
                    <span className="title">Category</span>
                    <span className="mini-title">Can't find the one you need ? <span className="link">Create one</span> </span>

                </div>
                <div className="scroll-box" id="scroll-box">
                    <div className="items" id="items">
                        { categories && categories.map(
                            cat =>
                            <FloatingListItem cat={cat} parentCatChosing={ catChosing }/>
                        ) }
                    </div>
                </div>
            </div>
            <div className="bg" onClick = { submitChosen } >
            </div>
        </div>
    );
}
