import React, { useEffect, useState } from 'react';

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
                            <span>Film ID</span>
                        </th>
                        <th className="field">
                            <span>Film title</span>
                        </th>
                        <th className="field">
                            <span>Description</span>
                        </th>
                        <th className="field">
                            <span>Release year</span>
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
                            <td>{film.film_id}</td>
                            <td>{film.title}</td>
                            <td>{film.description}</td>
                            <td>{film.release_year}</td>
                            <td>{film.language}</td>
                            <td>{film.rental_duration}</td>
                            <td>{film.rental_rate}</td>
                            <td>{film.length} minutes</td>
                            <td>{film.rating}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
