import React, { useState, useEffect } from 'react';

export default () => {

    const [ cats, setCats ] = useState([]);

    const formToggle = () =>{
        window.location = '/admin/categories/create';
    }

    useEffect( () => {
        fetch('/api/cats').then( res => res.json() )
        .then( (data) => {
            const { cats } = data;
            setCats(cats);
        })
    }, [])

    const deleteRequest = ( id ) => {
        const newData = cats.filter( cat => cat.id !== id );
        setCats(newData);

        fetch('/api/cat/remove', {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify( { id } ),
        }).then( res => res.json() )
        .then( (data) => {
            /* Do something if successfully deleted the item */
        })
    }

    return(
        <div className="table-view">
            <div className="header-bar">
                <div className="title">
                    <span className="content">CATEGORIES</span>
                </div>
                <div className="button">
                    <button onClick={ formToggle }>Add new</button>
                </div>
            </div>

            <div className="table-container">
                <table className="table">

                    <thead className ="thead">
                        <th className="field">
                            <span>Category name</span>
                        </th>
                        <th className="field">
                            <span>Description</span>
                        </th>
                    </thead>

                    <tbody>
                        { cats && cats.map( cat =>
                            <tr key={ cat.id }>
                                <td>{ cat.name }</td>
                                <td>{ cat.description }</td>
                                <td className="icon" onClick={ () => { deleteRequest(cat.id) } }>
                                    <img src="/images/utils/close.png"/>
                                </td>
                            </tr>
                         ) }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
