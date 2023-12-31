import { Alert, Image, Modal, Pressable, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import RNFS from 'react-native-fs';
import axios from 'axios';
import { WITH, url } from '../constants';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import ConfirmLoadData from '../component/ConfirmLoadData';

const LoadData = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    let totalWrittenData = 0;

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            // const token = '27|OTDG20Pjf0Y40TWUq56Fq4BWPgOJTr7AKkaZgvRB'
            return token;
        } catch (error) {
            console.log('Truy xuất token thất bại:', error);
            return null;
        }
    };

    const writeListSroies = async () => {
        try {
            const baererToken = await getToken();
            const response = await axios.get(`${url.getStories}`, {
                headers: {
                    Authorization: `Bearer ${baererToken}`,
                },
            })
                .then((response) => {
                    // console.log('res', response)
                    if (response.status == 200) {
                        const data = response.data;
                        const path = RNFS.DocumentDirectoryPath + '/dataListStory.json';
                        // console.log('path save data', path)
                        RNFS.writeFile(path, JSON.stringify(data), 'utf8')
                            .then(success => {
                                console.log('list story đã được lưu vào local');
                                totalWrittenData++;
                                if (totalWrittenData === 10) setIsLoading(false);
                            })
                            .catch(error => {
                                console.log('Lỗi khi lưu list story vào local:', error);
                            });
                    } else {
                        console.log('token had expired')
                        setIsLoading(true)
                    }
                })
        } catch (error) {
            console.error(error);
            ToastAndroid.showWithGravityAndOffset(
                "oop! Can't update data",
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50,
            );
            // Alert.alert()
            setIsLoading(false)
        }

    }

    const write10StoryData = async (token) => {
        for (let i = 1; i <= 8; i++) {
            try {
                const baererToken = await getToken();
                const response = await axios.get(`${url.getStories}/${i}`, {
                    headers: {
                        Authorization: `Bearer ${baererToken}`,
                    },
                })
                    .then((response) => {
                        if (response.status == 200) {
                            const data = response.data;
                            const path = RNFS.DocumentDirectoryPath + `/dataStory${i}.json`;
                            // console.log('path save data', path)
                            RNFS.writeFile(path, JSON.stringify(data), 'utf8')
                                .then(success => {
                                    console.log(`Dữ liệu story ${i} đã được lưu vào local`);
                                    totalWrittenData++;
                                    if (totalWrittenData === 8) setIsLoading(false);
                                })
                                .catch(error => {
                                    console.log('Lỗi khi lưu dữ liệu vào local:', error);
                                });
                        } else if (response.data) {

                        }
                        else {
                            console.log('token had expired')
                            setIsLoading(true)
                        }
                    })
            } catch (error) {
                console.error('error', error);
            }
        }

    }

    const position = useSharedValue(-50);

    const styleProgress = useAnimatedStyle(() => ({
        left: position.value
    }))

    const confirmLoadData = (isLoading, modalVisible) => {
        setModalVisible(modalVisible)
        setIsLoading(isLoading);
    }

    useEffect(() => {
        if (!modalVisible) {
            if (isLoading) {
                writeListSroies();
                write10StoryData();
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Menu' },
                        ],
                    })
                );
            }
        }
    }, [isLoading, modalVisible])

    useEffect(() => {
        if (!modalVisible) {
            position.value = withRepeat(
                withTiming(position.value + WITH * 0.8 + 50, { duration: 1000 }), -1, false
            )
        }
    }, [modalVisible])

    return (
        <View style={styles.container}>
            <ConfirmLoadData modalVisible={modalVisible} confirmLoadData={confirmLoadData} />
            <View style={styles.logo}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1697160691/StoryIcon/background/ngcvi9qv_khqxgl.png" }}
                    style={styles.image}
                />
            </View>
            <View style={styles.progress}>
                <Text>Loading...</Text>
                <View style={styles.progressBar} >
                    <Animated.View style={[styleProgress, { backgroundColor: "#8BED4F", width: '10%', height: '100%' }]} />
                </View>

            </View>
        </View>
    )
}

export default LoadData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150
    },
    progress: {
        flex: 5,
        width: '100%',
        alignItems: 'center'
    },

    progressBar: {
        height: 20,
        width: '80%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        overflow: 'hidden'
    }
})