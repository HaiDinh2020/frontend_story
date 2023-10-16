import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import Sound from 'react-native-sound';
import { fontSizes } from '../constants';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Foundation'
import { url } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Audio(props) {

    const [listAudio, setListAudio] = useState([])
    const [sound, setSound] = useState( new Sound('bowl', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        } 
    }))


    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            // const token = '27|OTDG20Pjf0Y40TWUq56Fq4BWPgOJTr7AKkaZgvRB'
            console.log('Token:', token);
            return token;
        } catch (error) {
            console.log('Truy xuất token thất bại:', error);
            return null;
        }
    };

    const getAudio = async () => {
        try {
            const baererToken = await getToken();
            const response = await axios.get(url.getAudio, {
                headers: {
                    Authorization: `Bearer ${baererToken}`,
                },
            });
            setListAudio(response.data);
            console.log("audio", response.data)
            // dispatch(loadStory(response.data))
        } catch (error) {
            console.error(error);
        }
    };

    const handlePlay = (audiioName) => {
        sound.release();
        const soundFile = new Sound(audiioName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            } 
            else {
                soundFile.play();
            }
        });
        
        setSound(soundFile)        
    }

    useEffect(() => {
        getAudio();
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.title}>Audio list</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={listAudio}
                    renderItem={({ item }) =>
                        <View style={styles.audioItem}>
                            <View style={styles.audioLeft} >
                                <Text style={styles.audioName}>{item.audio}</Text>
                            </View>
                            <View style={styles.audioPlay} >
                                <TouchableOpacity  onPress={() => handlePlay(item.audio)}>
                                    <Icon name='play-circle' size={50} style={styles.audioPlayIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    header: {
        backgroundColor: 'white',
        height: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontSize: 24,
        color:'black',
        fontWeight: 'bold',
        marginStart: 10
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 10,
    },
    audioItem: {
        height: 70,
        flexDirection: 'row',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderColor: "#e8e8e8",
        borderWidth: 2
    },
    audioLeft: {
        flex: 7,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    audioPlay: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    audioName: {
        fontSize: 20,
        marginLeft: 10,
        color: 'black'
    },
    audioPlayIcon: {
        color: 'black'
    }
})

export default Audio;