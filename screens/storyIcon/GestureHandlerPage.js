import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Text } from 'react-native'
import { useValue } from '@shopify/react-native-skia';
import { GestureDetector, Gesture, GestureHandlerRootView, Directions } from "react-native-gesture-handler";
import TitleIcon from './titleIcon/TitleIcon';
import Animated, { runOnJS,  useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';
import PageIcon from './PageIcon';
import Choices from './Choices';
import { useNavigation } from '@react-navigation/native';

function GestureHandlerPage(props) {
    const { width, height } = Dimensions.get('screen')
    const navigation = useNavigation()

    const pagesIcon = props.route.params.dataPageIcon
    const [page, setPage] = useState(pagesIcon[0])

    const [isFling, setIsFling] = useState(0)
    const [touch, setTouch] = useState(false)
    const cx = useValue(100);
    const cy = useValue(100);

    const [currentPage, setCurrentPage] = useState(0)
    const sync_data = page ? JSON.parse(page.has_text_config[0].belong_text.sync_data) : {}

    const cornorWith = useSharedValue(0);
    const cornorHeight = useSharedValue(0);
    const cornorWithLeft = useSharedValue(0);
    const cornorHeightLeft = useSharedValue(0);

    const reloadPage = () => {
        // console.log('reload page')
        setIsFling(isFling + 1);
    }

    const cornorRightStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: 'white',
            top: height - cornorHeight.value,
            left: width - cornorWith.value,
            width: cornorWith.value,
            height: cornorHeight.value,
        }
    })

    const cornorLeftStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: 'white',
            // top:WITH-cornorHeightLeft.value,
            width: cornorWithLeft.value,
            height: height,

        }
    })

    const touchGesture = Gesture.Tap()
        .onBegin((event) => {
            runOnJS(setTouch)(touch + 1)
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
            if (currentPage < pagesIcon.length - 1) {
                cornorWith.value = withTiming(width, { duration: 100 });
                cornorHeight.value = withTiming(height, { duration: 100 });
                runOnJS(setCurrentPage)(currentPage + 1)
            }
        })

    const prePageGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd(() => {
            if (currentPage > 0) {
                cornorWithLeft.value = withTiming(width, { duration: 100 });
                cornorHeightLeft.value = withTiming(height, { duration: 100 });
                runOnJS(setCurrentPage)(currentPage - 1)
            }
        })

    const gesture = Gesture.Simultaneous(prePageGesture, nextPageGesture, reloadPageGesture, touchGesture)

    const setIndexPage = (index) => {
        setCurrentPage(index)
    }
    const [autoLoad, setAutoLoad] = useState();
    const autoNextPage = () => {
        var i = currentPage;
        setCurrentPage(++i);
        setAutoLoad(() => {
            var auto = setInterval(() => {
                cornorWith.value = withTiming(width, { duration: 100 });
                cornorHeight.value = withTiming(height, { duration: 100 });
                setCurrentPage(++i);
                if (i > pagesIcon.length - 2) {
                    clearInterval(auto)
                }
            }, Number(sync_data[sync_data.length - 1].e) + 5000)
            return auto;
        })

    }

    const cancleAutoNextPage = () => {
        if (autoLoad) {
            console.log('clear auto')
            clearInterval(autoLoad)
        }
    }
    useEffect(() => {
        // console.log('render gesturehandlePage', pagesIcon)
        setTimeout(() => {
            cornorWith.value = 0;
            cornorHeight.value = 0;
            cornorWithLeft.value = 0;
            cornorHeightLeft.value = 0;
            setPage(pagesIcon[currentPage])
            reloadPage();
        }, 50)
        console.log(pagesIcon[currentPage+1], currentPage)
        if (currentPage == pagesIcon.length - 1) {
            setTimeout(() => {
                navigation.replace("EndGame")
            }, Number(sync_data[sync_data.length - 1].e) + 5000)
        }
    }, [currentPage])



    return (
        <SafeAreaView style={styles.container}>

            <GestureDetector gesture={gesture}>
                <Animated.View style={styles.container}>
                    <PageIcon page={page} cx={cx} cy={cy} touch={touch} isFling={isFling} />
                    <Animated.View style={[styles.cornor, cornorRightStyle]} />
                    <Animated.View style={[styles.cornor, cornorLeftStyle]} >
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
            <Choices setIndexPage={setIndexPage} autoNextPage={autoNextPage} cancleAutoNextPage={cancleAutoNextPage} />
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
