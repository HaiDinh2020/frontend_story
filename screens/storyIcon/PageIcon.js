import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import DataStoryIcon from './DataStoryIcon';
import { Canvas, Text, Rect, useFont, Image, useImage, useTouchHandler } from '@shopify/react-native-skia';
import { GestureDetector, Gesture, GestureHandlerRootView, Directions, FlingGestureHandler } from "react-native-gesture-handler";
import { WITH, HEIGHT } from '../../constants';
import TitleIcon from './titleIcon/TitleIcon';
import Animated, { Easing, runOnUI, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';
import GestureHanle from './titleIcon/GestureHanle';


function PageIcon({  }) {


    // console.log(WITH, HEIGHT)
    const pagesIcon = DataStoryIcon.has_page;
    const [page, setPage] = useState(pagesIcon[1])
    // const page = useSharedValue(pagesIcon[1])
    const background = useImage(page.background);
    const text_config = page.has_text_config
    const title = text_config[0]
    const icons = page.has_touch
    const picture = useImage(page.has_picture[0].picture)


    console.log("da")
    // console.log(1, icons.value)

    // const gesture = Gesture.Fling()
    // .direction(Directions.RIGHT | Directions.LEFT).onStart(() => {
    //     console.log('log')
    // }).onEnd((e) => {


    //     // runOnUI( setPage.value(page.valuesIcon[2]))
    //     page.value = pagesIcon[2];
    //     icons.value = page.value.has_touch
    // }).onFinalize((e) => {
    //     console.log(2, icons.value)
    // })

    const [isFling, setIsFling] = useState(false)

    const reloadPage = () => {
        setIsFling(!isFling);
    }

    


    return (
        <SafeAreaView style={styles.container}>
            <FlingGestureHandler 
                direction={Directions.DOWN | Directions.UP}
                onEnded={reloadPage} >
                <View style={{ flex: 1 }}>
                    <Canvas style={styles.container}>
                        <Image image={background} fit={'fill'} x={0} y={0} width={WITH < HEIGHT ? HEIGHT : WITH} height={HEIGHT > WITH ? WITH : HEIGHT} />
                        {/* <Image image={picture} fit={'cover'} x={300} y={200} width={200} height={150} /> */}
                    </Canvas>
                    <View style={styles.roundTitle}>
                        <View style={styles.title}>
                            <TitleIcon title={title} icons={icons} isFling={isFling} />
                        </View>
                    </View>
                </View>
            </FlingGestureHandler>
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
