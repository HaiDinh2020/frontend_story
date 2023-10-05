// import React, { useEffect, useMemo, useState } from 'react';
// import { StyleSheet, SafeAreaView, Image } from 'react-native'
// import DataStoryIcon from './DataStoryIcon';
// import { Canvas, Rect, useFont, useImage, useTouchHandler } from '@shopify/react-native-skia';
// import { GestureDetector, Gesture, GestureHandlerRootView, Directions } from "react-native-gesture-handler";
// import { WITH, HEIGHT } from '../../constants';
// import TitleIcon from './titleIcon/TitleIcon';
// import Animated, { Easing, runOnUI, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
// import { View, Text as RNText } from 'react-native';
// import GestureHanle from './titleIcon/GestureHanle';
// import PageIcon from './PageIcon';



// function ListPage(props) {


//     const pagesIcon = DataStoryIcon.has_page;
//     const background = useSharedValue(pagesIcon[0].background)
//     // const page = useSharedValue(pagesIcon[1])

//     // const viewStyle = useAnimatedStyle(() => {
//     //     return {
//     //         flex: 1 / page.value.id
//     //     }
//     // })
//     const [bg, setBg] = useState(background.value)
//     const gesture = Gesture.Pan()
//         .onStart(() => {
//             console.log('log pan')
//         })
//         .onEnd((e) => {
//             background.value = pagesIcon[1].background
//             // setBg(pagesIcon[1].background);
//             // runOnUI( setPage.value(page.valuesIcon[2]))
//             // page.value = pagesIcon[2];
//             // icons.value = page.value.has_touch
//         }).onFinalize((e) => {
//             console.log(2, background.value)
//         })


//     return (
//         <GestureDetector gesture={gesture} >
//             <View style={{ flex: 1 }}>
//                 <Image source={{
//                     uri: bg
//                 }}
//                     style={{ width: 200, height: 300 }} />
//             </View>
//         </GestureDetector>
//     )
// }

// export default ListPage;

import { useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    },
});
import {
    Directions,
    FlingGestureHandler,
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
  } from 'react-native-gesture-handler';
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler } from 'react-native-reanimated';



import {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

function ListPage() {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isPressed.value ? 'yellow' : 'blue',
        };
    });

    const [textDemo, setTextDemo] = useState('hello');


  const start = useSharedValue({ x: 0, y: 0 });
  const setState = () => {
    // 'worklet'
    setTextDemo('jedlfk');
  }
  const gesture =({nativeEvent}) => {
    console.log(nativeEvent)
    setTextDemo("choadjf ldnf dnf;DSNF DSLFNDSKN")
  }
    
const onDragRelease = ({nativeEvent}) => {
    console.log('Drag Releases ', Date.now());
    setTextDemo('hoewfhasdogfno'+Date.now())
  };

    

    return (
        <FlingGestureHandler 
         direction={Directions.DOWN | Directions.UP}
         numberOfPointers={1}   
        // onGestureEvent={gesture} 
        onEnded={onDragRelease}>
        {/* <GestureDetector gesture={gesture}> */}

            <View style={{flex:1}} >
            {console.log('render view')}
            <Text >{textDemo}</Text>
            <Animated.View style={[styles.ball, animatedStyles]} />
            </View>
        {/* </GestureDetector> */}
        </FlingGestureHandler>
    );
    
}

export default ListPage;
