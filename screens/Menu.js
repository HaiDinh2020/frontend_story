import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, Modal, Text, TouchableOpacity, View, Pressable } from 'react-native';
import MenuButton from "../component/MenuButton";
import Icon from 'react-native-vector-icons/AntDesign'
import { WITH, HEIGHT } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Menu({ navigation }) {


    const playStory = () => {
        navigation.navigate('Story')
    }

    const playStoryIcon = () => {
        navigation.navigate('Home')
    }

    const crud = () => {
        navigation.navigate('CreateText')
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('password');
            await AsyncStorage.removeItem('email');
            navigation.navigate('Login');
            console.log('asyncStorage data đã được xóa thành công');
        } catch (error) {
            console.log('Đã xảy ra lỗi khi xóa item:', error);
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../asserts/background_menu4.png')}
                resizeMode='cover'
                style={styles.background}
            >
                <View style={styles.header} >
                    <View style={styles.title}>

                        <Pressable
                            style={styles.setting}
                            // onPress={() => setModalVisible(!modalVisible)}
                            onPress={logout}
                        >
                            <Icon name='logout' size={30} color={'#efff42'} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.option} >
                    <MenuButton optionText={"Story"} handlePress={playStory} />
                    <MenuButton optionText={"List"} handlePress={playStoryIcon} />
                    <MenuButton optionText={"CRUD"} handlePress={crud} />
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
        width: WITH < HEIGHT ? WITH : HEIGHT,
        height: HEIGHT > WITH ? HEIGHT : WITH,
    },
    header: {
        flex: 4,

    },
    title: {
        flex: 0.2,
        flexDirection: 'row-reverse',
    },
    setting: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 2
    },
    option: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewModal: {
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 70,
        marginHorizontal: 30,
        borderRadius: 20
    }
})

export default Menu;