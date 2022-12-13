import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";

import { useState, useEffect } from 'react';

export default () => {

    const { id } = useParams();
    const [ value, setValue ] = useState("Ngo he");
    const [ film, setFilm ] = useState({});

    useEffect( () => {
        fetch(`/api/film/${id}`).then(res => res.json()).then( (data) => {
            setFilm(data.film);
            setValue( data.film["_id"] )
        })
    })

    return(
        <div className="qr-theme">
            <div className="qr-container">
                <div className="qr">
                { value ?
                    <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`}
                    /> :
                    null
                 }
                </div>
                <div className="infor">
                    <span>{film.title}</span>
                </div>
            </div>
        </div>
    )
}
