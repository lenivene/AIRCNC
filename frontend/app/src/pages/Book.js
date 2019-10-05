import React, { useState } from 'react';

import {
    AsyncStorage, StyleSheet, Alert,
    SafeAreaView, Text, TextInput, TouchableOpacity
} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }){
    const id = navigation.getParam('id');

    const [ date, setDate ] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, { headers : { user_id } });

        Alert.alert('Solicitação de reserva enviada.');

        navigateFromList();
    }

    function navigateFromList(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Data de interesse *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateFromList} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30
    },

    label : {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 10,
        color: '#444'
    },

    input : {
        paddingHorizontal: 20,
        borderColor: '#DDD',
        marginBottom: 20,
        borderRadius: 2,
        borderWidth: 1,
        color: '#444',
        fontSize: 16,
        height: 44,
    },

    button : {
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        height: 42
    },

    cancelButton : {
        backgroundColor: '#ccc',
    },

    buttonText : {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
    }
});