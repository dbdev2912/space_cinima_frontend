import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import SearchItem from './search_list_item';

import Film from './film';

export default () =>{

    const date = new Date();

    const [ switcher, setSwitcher ] = useState(false);
    const [ cats, setCats ] = useState([]);
    const [ films, setFilms ] = useState([]);
    const [ searchQueue, setSearchQueue ] = useState([])
    const [ releaseYear, setReleaseYear ] = useState(date.getFullYear())
    const [ searchString, setSearchString ] = useState("");

    const [ page, setPage ] = useState(0);
    const [ maxIndex, setMaxIndex ] = useState(0);
    const [ displayFilms, setDisplay ] = useState([])


    const limit = 6;

    const advancedSwitching = () =>{
        setSwitcher( !switcher )
    }


    useEffect( () => {
        fetch('/api/cats').then( res => res.json() )
        .then( (data) => {
            const { cats } = data;
            setCats(cats);
        });

        fetch('/api/films').then( res => res.json() )
        .then( (data) => {
            const { films } = data;
            films.sort( (f1, f2) => f1.release_schedule >= f2.release_schedule ? -1 : 1 );
            setFilms(films);
            setDisplay(films.slice(0, limit));
            setPage(1);
            setMaxIndex(Math.ceil(films.length / limit ) )
        } );
    }, [])

    const searchQueueAdd = (id) => {
        setSearchQueue( [...searchQueue, cats.filter(cat => cat.id===id)[0] ])
    }
    const searchQueueRemove = (id) => {
        const newQueue = searchQueue.filter( item => item.id !== id );
        setSearchQueue(newQueue);
    }

    const submitNormalSearch = () => {
        const searchCriteria = { searchString }

        fetch('/api/search', {
            method: "post",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ searchCriteria, advanced: false })
        }).then( res => res.json() )
        .then( (data) =>  {
            console.log(data)
        })

    }

    const submitAdvancedSearch = () => {
        const searchCriteria = { searchString, searchQueue, releaseYear }
        fetch('/api/search', {
            method: "post",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify({ searchCriteria, advanced: true })
        }).then( res => res.json() )
        .then( (data) =>  {
            console.log(data)
        })
    }


    const toPage = (index) => {
        setDisplay(films.slice((index - 1)*limit, index * limit));
        setPage(index);
        $(window).scrollTop(0);
    }

    return(
        <div className="container">
            <div className="search-bar">
                <div className="search">
                    <div className="input-bar">
                        <input type="text" value={ searchString } placeholder="Name, date release or anything 'bout what you wanna find"
                        onChange = { (e) => { setSearchString(e.target.value) } }
                        />
                    </div>
                    <div className="icons">
                    { !switcher ?
                        <div className="icon" onClick={ submitNormalSearch }>
                            <img src="/images/utils/search.png"/>
                        </div>
                        : null }

                        <div className="icon" onClick={ advancedSwitching }>
                            <img src="/images/utils/setting.png"/>
                        </div>
                    </div>
                </div>

                <div className={"advanced-search " + ( switcher ? "show" : "hide" )}>
                    <div className="search-list">
                        <span className="list-title">Categories</span>

                        <div className="items">
                            { cats && cats.map( cat =>
                                <SearchItem item = {cat} searchQueueAdd = { searchQueueAdd } searchQueueRemove={ searchQueueRemove }/>
                            )}
                        </div>
                    </div>

                    <div className="search-list">
                        <span className="list-title">Release Year</span>
                        <div className="input-bar">
                            <input type="text" placeholder="Year as number, please" value={releaseYear} onChange={ (e) => { setReleaseYear(e.target.value) } }/>
                        </div>

                    </div>

                    <button className="submit-search" onClick={submitAdvancedSearch}>Let's go</button>
                </div>
            </div>
            <div className="film-list">
                <div className="films">
                { displayFilms && displayFilms.map( film =>
                    <Film film={film} key={ film.film_id }/>
                )}
                </div>
                <div className="seperator">
                    <div className="btn-group">
                        <button onClick={ ()=> { toPage(1) } }><span className="prev"/><span className="prev"/></button>
                        { page !== 1 ?
                            <button onClick={ ()=> { toPage(page - 1) } }><span className="prev"/></button>
                            : null
                        }
                        <button>{ page }</button>
                        { page !== maxIndex ?
                            <button onClick={ ()=> { toPage(page + 1) } }><span className="next"/></button>
                            : null
                        }
                        <button onClick={ ()=> { toPage(maxIndex) } }><span className="next"/><span className="next"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
