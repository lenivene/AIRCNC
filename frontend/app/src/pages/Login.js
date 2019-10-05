import React, { 
    useState, 
    useEffect
} from 'react';

import {
    StyleSheet, Platform, AsyncStorage,
    KeyboardAvoidingView, View, Image, Text, TextInput, TouchableOpacity
} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }){
    useEffect(() => {
        AsyncStorage.getItem('user').then( user_exists => {
            if( user_exists ) navigation.navigate( 'List' );
        });
    });

    const [ email, setEmail ] = useState('');
    const [ techs, setTechs ] = useState('');

    async function handleSubmit(){
        const result = await api.post('/sessions', {
            email
        });

        const { _id } = result.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
            <Image source={logo} />
            
            <View style={styles.form}>
                <Text style={styles.label}>Seu e-mail *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Tecnologias *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label : {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 8,
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

    buttonText : {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
    }
})