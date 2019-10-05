import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
    StatusBar, Platform, StyleSheet, AsyncStorage, Alert,
    SafeAreaView, View, ScrollView, Image, Text
} from 'react-native';

import hostname from '../config/hostname';
import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';

export default function List(){
    const [ techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then( user_id => {
            const socket = socketio(`http://${hostname}:3333`, { query : { user_id } });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`);
            });
        })
    })

    useEffect(() => {
        AsyncStorage.getItem('techs').then( techsList => {
            const techsArr = techsList.split(',').map( tech => tech.trim());

            setTechs(techsArr);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />

            <ScrollView style={{marginBottom:20}}>
                {techs.map( tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 10,
    }
})