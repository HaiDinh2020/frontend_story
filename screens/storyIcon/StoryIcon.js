import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Button, TouchableOpacity, SafeAreaView, Easing, ActivityIndicator } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSpring, useHandler } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { url } from '../../constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function StoryIcon({ navigation}) {

    // const navigation = useNavigation()
    const outRangeY = 200;
    const outRangeX = 300;
    const listen = useSharedValue(outRangeY)
    const read = useSharedValue(outRangeY)
    const learn = useSharedValue(outRangeY)
    const thumbnail = useSharedValue(outRangeX)
    const storyInfor = useSharedValue(outRangeX)

    const animatedListen = useAnimatedStyle(() => ({
        transform: [{ translateY: listen.value }],
    }));

    const animatedRead = useAnimatedStyle(() => ({
        transform: [{ translateY: read.value }],
    }));

    const animatedLearn = useAnimatedStyle(() => ({
        transform: [{ translateY: learn.value }],
    }));

    const animatedThumbnail = useAnimatedStyle(() => ({
        transform: [{ translateX: -thumbnail.value }]
    }))

    const animatedStoryInfor = useAnimatedStyle(() => ({
        transform: [{ translateX: storyInfor.value }]
    }))

    const [isLoading, setLoading] = useState(true);
    const [dataPageIcon, setDataPageIcon] = useState();

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

    const getStoryById = async (id) => {
        try {
            const baererToken = await getToken();
            const response = await axios.get(`${url.getStories}/${id}`, {
                headers: {
                    Authorization: `Bearer ${baererToken}`,
                },
            });
            setDataPageIcon(response.data);
            console.log(2, response.data)
            // dispatch(loadStory(response.data))
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getStoryById(8)
    }, [])

    useEffect(() => {
        if(!isLoading) {
            listen.value = withTiming(listen.value - outRangeY, { duration: 1500 })
            read.value = withTiming(read.value - outRangeY, { duration: 2000 })
            learn.value = withTiming(learn.value - outRangeY, { duration: 2500 })
            thumbnail.value = withTiming(thumbnail.value - outRangeX, { duration: 2500 })
            storyInfor.value = withTiming(storyInfor.value - outRangeX, { duration: 2500 })
        }
        
    }, [isLoading])

    const listenStory = () => {
        // listen.value = withTiming(listen.value + outRangeY, { duration: 500 })
        // read.value = withTiming(read.value + outRangeY, { duration: 1000 })
        // learn.value = withTiming(learn.value + outRangeY, { duration: 1500 })
        // thumbnail.value = withTiming(thumbnail.value + outRangeX, { duration: 1500 })
        // storyInfor.value = withTiming(storyInfor.value + outRangeX, { duration: 1500 })
        // setTimeout(() => {
        // }, 500)
        navigation.navigate('GestureHandlerPage', {dataPageIcon: dataPageIcon.has_page})
    }


    const goBack = () => {
        console.log('go back')
        navigation.navigate('Menu');
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Icon name='chevron-left' size={20} onPress={goBack} />
                            <Icon name='heart' size={20} />
                        </View>
                        <View style={styles.content}>
                            <Animated.View style={[styles.thumbnail, animatedThumbnail]} >
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: dataPageIcon.thumbnail
                                    }}

                                />
                            </Animated.View>
                            <View style={styles.storyInfor}>
                                <Animated.View style={[{ flex: 5 }, animatedStoryInfor]}>

                                    <View style={styles.title}>
                                        <Text style={styles.name}> {dataPageIcon.name} </Text>
                                    </View>
                                    <View style={styles.infor}>
                                        <View style={styles.inforDetail}>

                                            <Text style={styles.item}>Tác giả: </Text>
                                            <Text>{dataPageIcon.author}</Text>
                                        </View>
                                        <View style={styles.inforDetail}>

                                            <Text style={styles.item}>Minh họa:</Text>
                                            <Text> Link lee</Text>
                                        </View>
                                    </View>
                                </Animated.View>
                                <View style={styles.option}>
                                    <Animated.View style={[styles.touchableOpacity, animatedListen]} >
                                        <TouchableOpacity onPress={listenStory}>
                                            <View style={styles.viewIcon} >
                                                <Icon style={styles.icon} name='volume-up' size={20} />
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View >
                                    <Icon name='angle-right' size={20} />
                                    <Animated.View style={[styles.touchableOpacity, animatedRead]} >
                                        <TouchableOpacity >
                                            <View style={styles.viewIcon} >
                                                <Icon style={styles.icon} name='microphone' size={20} />
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View>
                                    <Icon name='angle-right' size={20} />
                                    <Animated.View style={[styles.touchableOpacity, animatedLearn]} >
                                        <TouchableOpacity >
                                            <View style={styles.viewIcon} >
                                                <Icon style={styles.icon} name='question' size={20} />
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    content: {
        flex: 9,
        flexDirection: 'row',
    },
    thumbnail: {
        flex: 3,
        alignItems: 'flex-end'
    },
    image: {
        width: 160,
        height: 240,
        resizeMode: 'stretch',
        borderRadius: 20
    },
    storyInfor: {
        flex: 7,
        alignItems: 'center'
    },
    title: {
        flex: 3
    },
    name: {
        color: 'blue',
        fontSize: 28,
        fontWeight: 'bold'
    },
    infor: {
        flex: 2,
        flexDirection: 'row',
    },
    inforDetail: {
        paddingRight: 20
    },
    item: {
        color: 'lightblue'
    },
    option: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacity: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        marginHorizontal: 5
    },
    viewIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: 'white'
    }
})

export default StoryIcon;