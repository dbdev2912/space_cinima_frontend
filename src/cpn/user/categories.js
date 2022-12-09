import { useEffect, useState } from 'react';

export default () =>{

    const [ cates, setCates ] = useState([])

    useEffect(() => {
        fetch('/api/categories/detail').then( res => res.json()).then((data) => {
            const { categories } = data;
            setCates( categories );
        });
    }, []);

    return(
        <div className="cates">
            
        </div>
    )

}
