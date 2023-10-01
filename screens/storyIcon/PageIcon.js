import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import DataStoryIcon from './DataStoryIcon';
import { Canvas, Image, Rect, Text, useFont, useImage, useTouchHandler } from '@shopify/react-native-skia';
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { WITH, HEIGHT } from '../../constants';
import TitleIcon from './titleIcon/TitleIcon';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';


function PageIcon(props) {

    // console.log(WITH, HEIGHT)
    const pagesIcon = DataStoryIcon.has_page;
    const background = useImage(pagesIcon[1].background);
    const text_config = pagesIcon[1].has_text_config;
    const title = text_config[0]
    const icons = pagesIcon[1].has_touch
    const xi = useSharedValue(0);


    const [touch, setTouch] = useState(false)
    const [positionTouch, setPositionTouch] = useState();

    const touchHandler = useTouchHandler({
        onStart: ({ x, y }) => {
            setTouch(true)
            setPositionTouch({x, y});
            xi.value = withTiming(xi.value+100, {duration: 3000, easing: Easing.bounce})
        },
        onEnd: ({ x, y }) => {
            setTouch(false)
            // setPositionTouch();
        }
    })

    const gesture = Gesture.Pan()
        .onTouchesDown((e) => {
            'worklet'
            // console.log('hi', e)

        })
        .onTouchesUp((e)=>{
            'worklet'
            // console.log('canlse')

        })

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <GestureDetector gesture={gesture}>
                    <Canvas style={styles.container} onTouch={touchHandler} >
                        <Image image={background} fit={'fill'} x={0} y={0} width={WITH < HEIGHT ? HEIGHT : WITH } height={HEIGHT > WITH ? WITH : HEIGHT} />   
                        <TitleIcon title={title} icons={icons} touch={touch} positionTouch={positionTouch} />
                    </Canvas>
                    {/* <View style={{position:'absolute', flex:1}}>

                    </View> */}
                    
                </GestureDetector>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})

export default PageIcon;

// import { useEffect, useState } from "react";
// import { Canvas, Circle, Group, useTouchHandler } from "@shopify/react-native-skia";
// import {
//     useDerivedValue,
//     useSharedValue,
//     withRepeat,
//     withTiming,
// } from "react-native-reanimated";


// function PageIcon() {
//     const size = 256;
//     const r = useSharedValue(0);
//     const c = useDerivedValue(() => size - r.value);
//     const [touch, setTouch] = useState(false)
//     const touchHandler = useTouchHandler({
//         onStart: ({ x, y }) => {
//             setTouch(!touch)
//             // setPositionTouch({ x, y });
//             console.log('touch')
//         },
//         onEnd: ({ x, y }) => {
//             // setTouch(false)
//             // setPositionTouch();
//         }
//     })

//     useEffect(() => {
//         r.value = withTiming(size * 0.33, { duration: 1000 });
//       }, [r, size, touch]);
//     return (
//         <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
//             <Group blendMode="multiply">
//                 <Circle cx={r} cy={r} r={r} color="cyan" />
//                 <Circle cx={c} cy={r} r={r} color="magenta" />
//                 <Circle
//                     cx={size / 2}
//                     cy={c}
//                     r={r}
//                     color="yellow"
//                 />
//             </Group>
//         </Canvas>
//     );
// };

// export default PageIcon;
