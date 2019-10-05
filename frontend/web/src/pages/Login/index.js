import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Login( { history } ){
    const [ email, setEmail ] = useState('');

    useEffect( () => {
        const user_id = localStorage.getItem('user');

        if( user_id ){
            history.push('/dashboard');
        }
    });

    async function handleSubmit( e ){
        e.preventDefault();

        const result = await api.post('/sessions', { email });

        const { _id:user } = result.data;

        localStorage.setItem('user', user );

        history.push('/dashboard');
    }

    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail *</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Seu melhor e-mail"

                    onChange={e => setEmail( e.target.value )}
                />
                <button className="btn btn-red" type="submit">Entrar</button>
            </form>
        </>
    )
}