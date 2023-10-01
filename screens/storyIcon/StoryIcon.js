import React, { useEffect, useRef, useState } from 'react';
import { Button, TouchableOpacity, SafeAreaView, Easing } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5'

function StoryIcon({ navigation }) {
    const outRange = 200;
    const listen = useSharedValue(outRange)
    const read = useSharedValue(outRange)
    const learn = useSharedValue(outRange)

    const animatedListen = useAnimatedStyle(() => ({
        transform: [{ translateY: listen.value }],
    }));

    const animatedRead = useAnimatedStyle(() => ({
        transform: [{ translateY: read.value }],
    }));

    const animatedLearn = useAnimatedStyle(() => ({
        transform: [{ translateY: learn.value }],
    }));


    useEffect(() => {
        listen.value = withTiming(listen.value - outRange, { duration: 1500 })
        read.value = withTiming(read.value - outRange, {duration: 2000})
        learn.value = withTiming(learn.value - outRange, {duration: 2500})
    }, [])

    const listenStory = () => {
        navigation.navigate('PageIcon')
    }


    const goBack = () => {
        console.log('go back')
        navigation.navigate('Menu');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name='chevron-left' size={20} onPress={goBack} />
                <Icon name='heart' size={20} />
            </View>
            <View style={styles.content}>
                <View style={styles.thumbnail} >
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://res.cloudinary.com/dmrsdkvzl/image/upload/v1694453353/backgrounds/tyBrNbK7J3RQNyp5iFyOgk1672904703758_trong_qr7vih.png'
                        }}

                    />
                </View>
                <View style={styles.storyInfor}>
                    <View style={styles.title}>
                        <Text style={styles.name}>Danger in the Jungle</Text>
                    </View>
                    <View style={styles.infor}>
                        <View style={styles.inforDetail}>

                            <Text style={styles.item}>Tác giả: </Text>
                            <Text>Mary Blake</Text>
                        </View>
                        <View style={styles.inforDetail}>

                            <Text style={styles.item}>Minh họa:</Text>
                            <Text> Link lee</Text>
                        </View>
                    </View>
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
        paddingRight:20
    },
    item: {
        color:'lightblue'
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