import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import RNFS from 'react-native-fs';
import axios from 'axios';
import { WITH, url } from '../constants';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const LoadData = () => {

    const navigation = useNavigation();
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
                        } else if(response.data) {

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

    useEffect(() => {
        if(isLoading) {
            writeListSroies();
            write10StoryData();
        } else {
            navigation.navigate('Menu')
        }
    }, [isLoading])

    useEffect(() => {
        position.value = withRepeat(
            withTiming(position.value+WITH*0.8+50, {duration: 1000}), -1, false
        )
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1697160691/StoryIcon/background/ngcvi9qv_khqxgl.png" }}
                    style={styles.image}
                />
            </View>
            <View style={styles.progress}>
                <Text>Loading...</Text>
                <View style={styles.progressBar} >
                    <Animated.View style={[styleProgress, { backgroundColor: "#8BED4F", width: '10%', height: '100%'}]} />
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
        width: 100,
        height: 100
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
        overflow:'hidden'
    }
})