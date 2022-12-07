import { useState } from 'react';

export default (props) => {
    const { cat, parentCatChosing } = props
    const [ icon, setIcon ] = useState(cat.isChosen)
    const catChosing = (id) =>{
        setIcon(!icon);
        parentCatChosing(id)
    }

    return(
        <div className="item" key={ cat.id } onClick={ () => { catChosing( cat.id ) } }>
            <div className="name">
                <span>{ cat.name }</span>
            </div>
            <div className="icon">
                <div>
                    { icon ?
                        <span />
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
