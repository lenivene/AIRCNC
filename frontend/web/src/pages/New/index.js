import React, { useState, useMemo } from 'react';

import './styles.css';
import camera from '../../assets/camera.svg';
import api from '../../services/api';

export default function New({ history }){
    const [ thumbnail, setThumbnail ] = useState(null);

    const thumbnailPreview = useMemo( () => {
        return thumbnail ? URL.createObjectURL( thumbnail ) : null;
    }, [ thumbnail ] )

    const [ company, setCompany ] = useState('');
    const [ techs, setTechs ] = useState('');
    const [ price, setPrice ] = useState('');

    async function handleSubmit( e ){
        e.preventDefault();

        const data = new FormData();

        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    function handleNavFromDashboard(){
        history.push('/dashboard');
    }

    return (
        <>
            <span onClick={handleNavFromDashboard} className="navigation">&#8617; Dashboard</span>
            <form onSubmit={handleSubmit}>
                <label
                id="thumbnail"
                style={{ backgroundImage: `url(${thumbnailPreview})`}}
                className={thumbnailPreview ? 'hasThumbnail' : ''}
                >
                    <input type="file" onChange={e => setThumbnail( e.target.files[0] )} />
                    <img src={camera} alt="Camera" />
                </label>
                <label htmlFor="company">EMPRESA *</label>
                <input
                    id="company"
                    placeholder="Sua empresa"
                    value={company}
                    onChange={e => setCompany( e.target.value )}
                />

                <label htmlFor="techs">TECNOLOGIAS *</label>
                <input
                    id="techs"
                    placeholder="Quais tecnologias usam?"
                    value={techs}
                    onChange={e => setTechs( e.target.value )}
                />

                <label htmlFor="price">VALOR DA DIÁRIA * <span>( em branco para GRATUITO )</span></label>
                <input
                    id="price"
                    placeholder="Valor cobrado por dia"
                    value={price}
                    onChange={e => setPrice( e.target.value )}
                />

                <button className="btn btn-red" type="submit">Cadastrar</button>
            </form>
        </>
    )
}