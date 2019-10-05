import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import hostname from '../config/hostname';
import api from '../services/api';

function SpotList({ tech, navigation }){
    const [ spots, setSpots ] = useState([]);

    useEffect(() => {
        (async () =>{
            const result = await api.get('/spots', { params : { tech } });

            setSpots(result.data);
        })();
    }, []);

    function handleNavigate( id ){
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{
                            uri : item.thumbnail_url.replace( 'localhost', hostname )
                        }} style={styles.thumbnail} />
                        <Text style={styles.company}>{ item.company }</Text>
                        <Text style={styles.price}>{ ! item.price ? 'Gratuito' : `R$${item.price}/dia` }</Text>
                        <TouchableOpacity onPress={() => { handleNavigate( item._id ) }} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        marginTop: 15
    },

    bold : {
        fontWeight: 'bold'
    },

    title : {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 24,
        marginBottom: 15
    },

    list : {
        paddingHorizontal: 20
    },

    listItem : {
        marginRight: 15
    },

    thumbnail : {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },

    company : {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button : {
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
        height: 32,
    },

    buttonText : {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 15
    }
});

export default withNavigation( SpotList );