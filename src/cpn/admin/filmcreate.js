import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import HiddenBox from './hiddenbox';

export default () => {

    const [ img, setImgae ] = useState("");
    const [ film, setFilm ] = useState({});

    const [ cats, setCats ] = useState([]);
    const [ hiddenBox, setBoxState ] = useState(false);

    useEffect( () => {
        fetch('/api/cats').then( res => res.json() )
        .then( (data) => {
            const { cats } = data;
            setCats(cats);
        })
    }, []);


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

    const hiddenBoxSwitching = () => {
        setBoxState( !hiddenBox )
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
            /* for future scaling: Do something if needed*/
        });
    }

    const catChosing = (id) => {
        const cat = cats.filter( cate => cate.id === id )[0];

        const index  = cats.indexOf( cat );
        cat.isChosen = !cat.isChosen;
        let newData = cats;
        newData[index] = cat;
        setCats(newData);
    }

    const submitChosen = () => {
        const chosen = cats.filter(cat => cat.isChosen === true);

        let categoriesString = "";
        const chosenCates = [];

        for( let i = 0; i < chosen.length; i++ ){
            categoriesString += `${ chosen[i].name }, `;
            chosenCates.push( chosen[i].name )
        }

        categoriesString = categoriesString.slice(0, categoriesString.length - 2);

        setFilm({ ...film, categories_string: categoriesString, categories: chosenCates });
        setBoxState( !hiddenBox );
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
                        <label className="label">Categories</label>
                        <input className="input" type="text" spellCheck="false" value={film.categories_string} onFocus = { hiddenBoxSwitching }/>
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
            { hiddenBox ?
                <HiddenBox categories={ cats } catChosing={ catChosing } submitChosen={ submitChosen }/>
            : null
            }
        </div>
    )
}
