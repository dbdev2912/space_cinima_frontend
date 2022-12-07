import React, { useState, useEffect } from 'react';

export default ( props ) => {
    const { item, searchQueueAdd, searchQueueRemove } = props;
    const [ icon, setIcon ] = useState(false);

    const switching = () => {

        if(!icon){
            searchQueueAdd( item.id )
        }else{
            searchQueueRemove( item.id )
        }

        setIcon(!icon);
    }

    return(
        <div className="item" key={item.id} onClick={ switching }>
            <div className="icon">
                <div>{ icon ?<span/>: null } </div>
            </div>
            <div className="content">
                <span>{item.name}</span>
            </div>
        </div>
    )
}
