import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MenuButton from "../component/MenuButton";

const WITH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

function Menu({navigation}) {


    const playStory = () => {
        navigation.navigate('Home')
    }
    
    const playStoryIcon = () => {
        
    } 

    const crudAudio = () => {

    }

    const exit = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../asserts/background_menu4.png')}
                resizeMode='cover'
                style={styles.background}
            >
                <View style={styles.header} />

                <View style={styles.option} >
                    <MenuButton optionText={"Story"} handlePress={playStory}/>
                    <MenuButton optionText={"Story Icon"} handlePress={playStoryIcon}/>
                    <MenuButton optionText={"CRUD Audio"} handlePress={crudAudio}/>
                    {/* <MenuButton optionText={"Exit"} handlePress={exit}/> */}
                </View>

                <View style={styles.footer} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
    background: {
        width: WITH,
        height: HEIGHT,
    },
    header: {
        flex: 4
    },
    footer: {
        flex: 2
    },
    option: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})

export default Menu;