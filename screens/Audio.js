import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Sound from 'react-native-sound';
import {} from '../asserts/audio/bowl.mp3'
import { fontSizes } from '../constants';
import { useSelector } from 'react-redux';
import { url } from '../constants';

function Audio(props) {
    const [sound, setSound] = useState();
    const story = useSelector((state)=> state.stories)
    // const audio = useSelector((state)=> state.stories.)
    const audio = '../asserts/audio/bowl.mp3'
    console.warn(4, story);
    const soundFile = new Sound(url.audio, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
    });

    const playSound = () => {
        sound.play();
    }

    useEffect(() => {
        setSound(soundFile);
        return () => {
            if (sound) {
              sound.release();
              console.log('sound released')
            }
          };
    }, [])
    return (
        <View style={styles.container} >
            <View style={styles.header}>

                <Text style={styles.title}>Audio list</Text>
            </View>
            <Button title="Phát âm thanh" onPress={playSound} />
            <View style={styles.content}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f2f2f2',
        flex:1
    },
    header: {
        backgroundColor:'white',
        height:40
    },
    title: {
        fontSize:fontSizes.h1,
        fontWeight:'bold',
        marginStart: 10
    },
    content: {
        flex:1,
        backgroundColor:'white',
        marginHorizontal:20,
        marginTop:30,
        borderRadius:10,
        // shadowColor:'red',
        // shadowOffset:{width: 10,height: 10},
        // shadowOpacity:10,
        // shadowRadius:10,
        // shadowColor:'red'
    }
})

export default Audio;