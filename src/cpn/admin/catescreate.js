import React, { useState, useEffect } from 'react';

export default () => {

    const [cat, setCat] = useState({});

    const submit = async () => {
        if( cat ){
            fetch('/api/cates/create', {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ cat }),
            }).then( res => res.json() )
            .then( (data) => {
                const { success } = data;

                if( success ){
                    window.location = '/admin/categories';
                }
            })
        }
    }

    return(
        <div className="table-view">

            <div className="header-bar">
                <div className="title">
                    <span className="content">CATEGORY ADD</span>
                </div>
            </div>
            <div className="add-form">
                <div className="info-form">
                    <div className="form-field">
                        <label className="label">Category name</label>
                        <input className="input" type="text" spellCheck="false" value={cat.name ? cat.name : ""} onChange={
                            (e) => { setCat({...cat, name: e.target.value}) }
                        }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Description</label>
                        <textarea className="input" type="text" spellCheck="false" value={cat.description ? cat.description : ""} onChange={
                            (e) => { setCat({...cat, description: e.target.value}) }
                        }
                        style={{height: "200px"}}
                        />
                    </div>

                    <div className="btn-group">
                        <button onClick = { submit }>Commit</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
