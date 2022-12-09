import redirect from '../useful_modules/redirect';
import { useState, useEffect } from 'react';

export default ( props ) => {

    const [ film, setFilm ]  = useState(props.film);
    const [ button, setButton ] = useState( film.is_registed );

    const getTicket = (id) =>{
        fetch('/api/register/ticket', {
            method: "POST",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ id })
        }).then( res => res.json())
        .then( (data) => {

            setFilm({ ...film, is_registed: true });
        });
    }

    const cancelTicket = (id) =>{
        fetch('/api/cancel/ticket', {
            method: "POST",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ id })
        }).then( res => res.json())
        .then( (data) => {

            setFilm({ ...film, is_registed: false });
        });
    }

    return (
        <div className="box" key={ film.film_id }>
            <div className="film">
                <div className="header-img">
                    <img src={ film.img }/>
                </div>
                <div className="film-info">
                    <span className="title">{ film.title }</span>
                    <span className="description">{film.description}</span>
                </div>
                <div className="utils">
                    <div className="util" onClick={ () => { redirect("/film/" + film.film_id) } }>
                        <span>Detail</span>
                    </div>
                    {
                        !film.is_registed ?
                        <div className="util" onClick={ () => { getTicket(film.film_id) } }>
                            <span>Get ticket</span>
                        </div>
                        :
                        <div className="util" onClick={ () => { cancelTicket(film.film_id) } }>
                            <span>Cancel ticket</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
