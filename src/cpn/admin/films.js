import React, { useEffect, useState } from 'react';

import dateFormater from '../useful_modules/date_formater';

export default () => {

    const [ films, setFilms ] = useState([]);

    const formToggle = () =>{
        window.open('/admin/film/create', '_blank').focus();
    }

    useEffect(() => {
        fetch('/api/films').then(res => res.json()).then( (data) => {
            const { films } = data;
            setFilms(films);
        });
    }, []);

    const deleteRequest = ( id ) => {
        const newData = films.filter( cat => cat.film_id !== id );
        setFilms(newData);

        fetch('/api/film/remove', {
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
                    <span className="content">FILMS</span>
                </div>
                <div className="button">
                    <button onClick={ formToggle }>Add new</button>
                </div>
            </div>
            <div className="table-container">
                <table className="table">

                    <thead className ="thead">
                        <th className="field">
                            <span>Film title</span>
                        </th>
                        <th className="field">
                            <span>Category</span>
                        </th>
                        <th className="field">
                            <span>Description</span>
                        </th>
                        <th className="field">
                            <span>Release year</span>
                        </th>
                        <th className="field">
                            <span>Release schedule</span>
                        </th>
                        <th className="field">
                            <span>Language</span>
                        </th>
                        <th className="field">
                            <span>Rental duration</span>
                        </th>
                        <th className="field">
                            <span>Rental rate</span>
                        </th>
                        <th className="field">
                            <span>Length</span>
                        </th>
                        <th className="field">
                            <span>Rating</span>
                        </th>
                    </thead>
                    <tbody>

                    {films && films.map( film =>
                        <tr key={ film.film_id }>
                            <td>{film.title}</td>
                            <td>{film.categories_string}</td>
                            <td>{film.description}</td>
                            <td>{film.release_year}</td>
                            <td>{dateFormater(film.release_schedule)}</td>
                            <td>{film.language}</td>
                            <td>{film.rental_duration}</td>
                            <td>{film.rental_rate}</td>
                            <td>{film.length} minutes</td>
                            <td>{film.rating}</td>
                            <td className="icon" onClick={ () => { deleteRequest(film.film_id) } }>
                                <img src="/images/utils/close.png"/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
