import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import date_formater from './../useful_modules/date_formater';


const Infor = (props) => {

    const { title, content } = props;

    return(
        <div className="infor">
            <div className="info-field">
                <span className="title">{ title }</span>
            </div>
            <div className="info-field">
                <span className="content">{ content }</span>
            </div>
        </div>
    )
}

export default () => {

    const [ film, setFilm ] = useState({});
    const { id } = useParams()

    useEffect( () => {
        fetch(`/api/film/${id}`).then( res => res.json() ).then( (data) => {
            const { film } = data;
            setFilm(film);
        });
    }, []);

    const getTicket = (id) =>{
        fetch('/api/register/ticket', {
            method: "POST",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ id })
        }).then( res => res.json())
        .then( (data) => {

            setFilm( {...film, is_registed: true} )

        });
    }

    const cancelTicket = (id) =>{
        fetch('/api/cancel/ticket', {
            method: "POST",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ id })
        }).then( res => res.json())
        .then( (data) => {
            setFilm( {...film, is_registed: false} )
        });
    }

    return(
        <div className="detail">

            <div className="header-info">
                <div className="img-container">
                    <img src={ film.img }/>
                    <div className="header-title">
                        <span className="title">{ film.title }</span>
                    </div>
                </div>

                <div className="infors">
                    <Infor title="Categories" content={ film.categories_string }/>
                    <Infor title="Language" content={ film.language }/>
                    <Infor title="Release Year" content={ film.release_year }/>
                    <Infor title="Premiere on" content={ date_formater(film.release_schedule) }/>
                    <Infor title="Length" content={ `${film.length} minute(s)` } />
                    <Infor title="Rating" content={ film.rating }/>
                    <Infor title="Rental duration" content={ film.rental_duration }/>
                    <Infor title="Rental rate" content={ film.rental_rate }/>

                    <div className="description">
                        <p>{ film.description }</p>
                    </div>
                </div>
            </div>

            <div className="utils">
                <div className="btn">
                { !film.is_registed ?
                    <button onClick={ () => getTicket( film.film_id ) }>Get ticket</button>
                    :
                    <button onClick={ () => cancelTicket( film.film_id ) }>Cancel ticket</button>
                }
                </div>
            </div>

        </div>
    )
}
