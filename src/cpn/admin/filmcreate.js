import React, { useState } from 'react';
import $ from 'jquery';

export default () => {

    const [ img, setImgae ] = useState("");

    const [ film, setFilm ] = useState({});

    const chosingImage = () => {
        $('#file-input').click()
    }

    const fileChange = (e) =>{
        const file = e.target.files[0];
        console.log(file);
        if(file){
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = function(e){
                setImgae(e.target.result);
            }
        }
    }

    const submit = () =>{
        fetch('/api/new/film', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ film, img })
        }).then( res => res.json() )
        .then( (data) => {
            console.log(data);
        });
    }

    return(
        <div className="table-view">

            <div className="header-bar">
                <div className="title">
                    <span className="content">FILM ADD</span>
                </div>
            </div>

            <div className="add-form">
                <div className="info-form">
                    <div className="form-field">
                        <label className="label">Film title</label>
                        <input className="input" type="text" spellCheck="false" value={film.title} onChange={ (e) => { setFilm({...film, title: e.target.value}) } }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Description</label>
                        <textarea className="input" spellCheck="false" value={film.description} onChange={ (e) => { setFilm({...film, description: e.target.value}) } }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Release year</label>
                        <input className="input" type="text" spellCheck="false" value={film.release_year} onChange={ (e) => { setFilm({...film, release_year: e.target.value}) } }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Language</label>
                        <input className="input" type="text" spellCheck="false" value={film.language} onChange={ (e) => { setFilm({...film, language: e.target.value}) } }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Rental duration</label>
                        <input className="input" type="text" spellCheck="false" value={film.rental_duration} onChange={ (e) => { setFilm({...film, rental_duration: e.target.value}) } }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Rental rate</label>
                        <input className="input" type="text" spellCheck="false" value={film.rental_rate} onChange={ (e) => { setFilm({...film, rental_rate: e.target.value}) } }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Length</label>
                        <input className="input" type="text" spellCheck="false" value={film.length} onChange={ (e) => { setFilm({...film, length: e.target.value}) } }/>
                    </div>

                    <div className="form-field">
                        <label className="label">Rating</label>
                        <input className="input" type="text" spellCheck="false" value={film.rating} onChange={ (e) => { setFilm({...film, rating: e.target.value}) } }/>
                    </div>

                </div>

                <div className="picture-form">
                    <div className="img-container" onClick={ chosingImage }>
                        {
                            img ?
                            <div className="image-preview" style={{ backgroundImage: `url(${img})` }}/>:

                            <button>Chose picture</button>
                        }
                        <input type='file' accept="image/*" id="file-input" style={{display: "none"}} onChange={ (e) => { fileChange(e); } }/>
                    </div>
                </div>

                <div className="btn-group">
                    <button onClick = { submit }>Commit</button>
                </div>
            </div>


        </div>
    )
}
