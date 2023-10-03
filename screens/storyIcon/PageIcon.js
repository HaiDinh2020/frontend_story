import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import DataStoryIcon from './DataStoryIcon';
import { Canvas, Rect, useFont, Image, useImage, useTouchHandler } from '@shopify/react-native-skia';
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { WITH, HEIGHT } from '../../constants';
import TitleIcon from './titleIcon/TitleIcon';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { View, Text as RNText } from 'react-native';
import GestureHanle from './titleIcon/GestureHanle';


function PageIcon(props) {

    // console.log(WITH, HEIGHT)
    const pagesIcon = DataStoryIcon.has_page;
    const background = useImage(pagesIcon[1].background);
    const text_config = pagesIcon[1].has_text_config;
    const title = text_config[0]
    const icons = pagesIcon[1].has_touch
    const picture = useImage(pagesIcon[1].has_picture[0].picture)
    // console.log((pagesIcon[1].has_picture[0].data.boundingbox).x)

    const touchHandler = useTouchHandler({
        // onStart: ({ x, y }) => {
        //     setTouch(true)
        //     setPositionTouch({ x, y });
        //     xi.value = withTiming(xi.value + 100, { duration: 3000, easing: Easing.bounce })
        // },
        // onEnd: ({ x, y }) => {
        //     setTouch(false)
        //     // setPositionTouch();
        // }
    })

    const gesture = Gesture.Pan()
        .onTouchesDown((e) => {
            // "worklet" 
            console.log('touch down', e)
            
        })
        .onTouchesMove((e) => {
            console.log('move', e)
        })
        .onTouchesUp((e) => {
            console.log('up', e)
        })


    return (
        <SafeAreaView style={styles.container}>

            <GestureDetector gesture={gesture}>
            <Canvas style={styles.container} onTouch={touchHandler} >
                <Image image={background} fit={'fill'} x={0} y={0} width={WITH < HEIGHT ? HEIGHT : WITH} height={HEIGHT > WITH ? WITH : HEIGHT} />
                <Image image={picture} fit={'fill'} x={300} y={100} width={400} height={250} />
            </Canvas>
            </GestureDetector>
                <View style={styles.roundTitle}>
                    <View style={styles.title}>
                        <TitleIcon title={title} icons={icons} />
                    </View>
                </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    roundTitle: {
        position: 'absolute', 
        paddingHorizontal: 50, 
        width: WITH < HEIGHT ? HEIGHT : WITH 
    },
    title: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export default PageIcon;
