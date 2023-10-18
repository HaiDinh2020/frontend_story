import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Button, TouchableOpacity, SafeAreaView, Easing, ActivityIndicator } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSpring, useHandler, withSequence } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { url } from '../../constants';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import { useStoryStore } from '../../store/zustandStore';

function StoryIcon(props) {
    const pageId = props.route.params.id
    const navigation = useNavigation()
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
    const setTypeStory = useStoryStore((state) => state.setTypeStory)

    const getStoryById = async (id) => {
        try {
            const path = RNFS.DocumentDirectoryPath + `/dataStory${id}.json`;
            RNFS.readFile(path, 'utf8')
                .then(content => {
                    // Xử lý dữ liệu ở đây
                    const data = JSON.parse(content);
                    setDataPageIcon(data)
                    setLoading(false);
                    console.log('Dữ liệu story id đã được đọc từ local:')
                })
                .catch(error => {
                    console.log('Lỗi khi đọc dữ liệu từ local:', error);
                    setLoading(true);
                });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getStoryById(pageId)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            listen.value = withTiming(listen.value - outRangeY, { duration: 500 })
            read.value = withTiming(read.value - outRangeY, { duration: 1000 })
            learn.value = withTiming(learn.value - outRangeY, { duration: 1500 })
            thumbnail.value = withTiming(thumbnail.value - outRangeX, { duration: 1500 })
            storyInfor.value = withTiming(storyInfor.value - outRangeX, { duration: 1500 })
        }

    }, [isLoading])

    const listenStory = () => {
        listen.value = withSequence(
            withTiming(listen.value + outRangeY, { duration: 500 }),
            withSpring(0)
        )
        read.value = withSequence(
            withTiming(read.value + outRangeY, { duration: 1000 }),
            withSpring(0)
        )
        learn.value = withSequence(
            withTiming(learn.value + outRangeY, { duration: 1500 }),
            withSpring(0)
        )
        thumbnail.value = withSequence(
            withTiming(thumbnail.value + outRangeX, { duration: 1500 }),
            withSpring(0)
        )
        storyInfor.value = withSequence(
            withTiming(storyInfor.value + outRangeX, { duration: 1500 }),
            withSpring(0)
        )
        // navigation.navigate("EndGame")
        if (dataPageIcon.has_page.length != 0) {
            navigation.navigate('GestureHandlerPage', { dataPageIcon: dataPageIcon.has_page })
        }
        setTypeStory(dataPageIcon.type)
    }


    const goBack = () => {
        console.log('go back')
        navigation.navigate('Story');
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
        marginHorizontal: 20
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