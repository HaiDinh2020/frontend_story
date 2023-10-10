import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import DataStoryIcon from './DataStoryIcon';
import { useValue } from '@shopify/react-native-skia';
import { GestureDetector, Gesture, GestureHandlerRootView, Directions } from "react-native-gesture-handler";
import TitleIcon from './titleIcon/TitleIcon';
import Animated, { Easing, runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageIcon from './PageIcon';
import Choices from './Choices';


function GestureHandlerPage({ }) {
    const { width, height } = Dimensions.get('screen')

    const pagesIcon = DataStoryIcon.has_page;
    const [page, setPage] = useState(pagesIcon[0])

    const [isFling, setIsFling] = useState(false)
    const [isTouch, setIsTouch] = useState(false)
    const cx = useValue(100);
    const cy = useValue(100);

    const [currentPage, setCurrentPage] = useState(0)

    const cornorWith = useSharedValue(0);
    const cornorHeight = useSharedValue(0);
    const cornorWithLeft = useSharedValue(0);
    const cornorHeightLeft = useSharedValue(0);

    const reloadPage = () => {
        // console.log('reload page')
        setIsFling(!isFling);
    }

    const cornorRightStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: 'lightblue',
            top: height - cornorHeight.value,
            left: width - cornorWith.value,
            width: cornorWith.value,
            height: cornorHeight.value,
        }
    })

    const cornorLeftStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: '#B5B5B5',
            // top:WITH-cornorHeightLeft.value,
            width: cornorWithLeft.value,
            height: height,

        }
    })

    const touchGesture = Gesture.Tap()
        .onBegin((event) => {
            runOnJS(setIsTouch)(true)
            cx.current = event.x;
            cy.current = event.y
        })

    const reloadPageGesture = Gesture.Fling()
        .direction(Directions.DOWN | Directions.UP)
        .onEnd(() => {
            runOnJS(reloadPage)()
        })

    const nextPageGesture = Gesture.Fling()
        .direction(Directions.LEFT)
        .onBegin(() => {
        })
        .onEnd(() => {
            cornorWith.value = withTiming(width, { duration: 300 });
            cornorHeight.value = withTiming(height, { duration: 300 });
            runOnJS(setCurrentPage)(currentPage + 1)
        })

    const prePageGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd(() => {
            if (currentPage > 0) {
                cornorWithLeft.value = withTiming(width, { duration: 300 });
                cornorHeightLeft.value = withTiming(height, { duration: 300 });
                runOnJS(setCurrentPage)(currentPage - 1)
            }
        })

    const gesture = Gesture.Simultaneous(prePageGesture, nextPageGesture, reloadPageGesture, touchGesture)

    setTimeout(() => {
        setIsTouch(false)
    }, 1000)

    const setIndexPage = (index) => {
        setCurrentPage(index)
    }
    const [autoLoad, setAutoLoad] = useState();
    const autoNextPage = () => {
            let i = currentPage;
            setCurrentPage(++i);
            setAutoLoad(setInterval(() => {
                cornorWith.value = withTiming(width, { duration: 300 });
                cornorHeight.value = withTiming(height, { duration: 300 });
                setCurrentPage(++i);
                console.log("i", i)
                if(i > 4) {
                    cancleAutoNextPage()
                }
            }, 8000))
    }

    const cancleAutoNextPage = () => {
        if(autoLoad) {
            console.log('clear auto')
            clearInterval(autoLoad)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            cornorWith.value = 0;
            cornorHeight.value = 0;
            cornorWithLeft.value = 0;
            cornorHeightLeft.value = 0;
            setPage(pagesIcon[currentPage])
            reloadPage();
        }, 100)
    }, [currentPage])



    return (
        <SafeAreaView style={styles.container}>

            <GestureDetector gesture={gesture}>
                <Animated.View style={styles.container}>
                    <PageIcon page={page} cx={cx} cy={cy} isTouch={isTouch} isFling={isFling} />

                    <Animated.View style={[styles.cornor, cornorRightStyle]} >
                        <LinearGradient colors={['black', 'white']} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 0.5 }} style={{ width: width, height: height }} />
                    </Animated.View>
                    <Animated.View style={[styles.cornor, cornorLeftStyle]} >
                    </Animated.View>
                    <Choices setIndexPage={setIndexPage} currentPage={currentPage} autoNextPage={autoNextPage} cancleAutoNextPage={cancleAutoNextPage}/>
                </Animated.View>
            </GestureDetector>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',

    },
    cornor: {
        position: 'absolute',
    },
})

export default GestureHandlerPage;
