import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard( { history } ){
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio( 'http://localhost:3333', { query : { user_id }} ), [ user_id ] );

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [ requests, socket ]);

    useEffect(() => {    
        (async () => {
            const user_id = localStorage.getItem('user');
            const {data:spots} = await api.get('/dashboard', { headers : { user_id } });

            setSpots( spots );
        })();

    }, []);

    function handleLogout(){
        localStorage.removeItem("user");

        history.push('/');
    }

    async function handleAcceptBooking( id ){
        await api.post(`/bookings/${id}/approvals`);

        setRequests( requests.filter( request => request._id !== id ) );
    }

    async function handleRejectBooking( id ){
        await api.post(`/bookings/${id}/rejections`);

        setRequests( requests.filter( request => request._id !== id ) );
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAcceptBooking( request._id)}>Aceitar</button>
                        <button className="reject" onClick={() => handleRejectBooking( request._id)}>Rejeitar</button>
                    </li>
                ))}
            </ul>
            <span onClick={handleLogout} className="navigation">Sair</span>
            {(spots.length > 0) ? (
                <ul className="spot-list">
                    {spots.map(( spot ) => (
                        <li key={spot._id}>
                            <header style={{
                                backgroundImage: `url(${spot.thumbnail_url})`
                            }}/>
                            <strong>{spot.company}</strong>
                            <span>{!spot.price ? 'GRATUITO' : `R$${spot.price}/dia`}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum spot cadastrado.</p>
            )}

            <Link to='/new'>
                <button className="btn btn-red">Cadastrar novo spot</button>
            </Link>
        </>
    )
}