import React, { useEffect, useRef } from 'react';
import {Image as RNImage} from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


function GestureHanle(props) {


    const scale = 1.5;
   const imagewidth = useSharedValue(100)
    const imageheight = useSharedValue(100)
    const IMAGE_SIZE = 200;
        const imageSize = useSharedValue(IMAGE_SIZE);

    // const styleImage = useAnimatedStyle(()=> {
    //     width: isButtonActive ? 200 : 100,
    //     height: isButtonActive ? 200 : 100,
    // })



  const gesture = Gesture.Pan()
        .onTouchesDown((e) => {
            
            console.log('ges demo')
            // width.value = withTiming(width.value*scale, {duration: 500})
            // height.value = withTiming(height.value*scale, {duration: 500})
            imageSize.value = withTiming(imageSize.value/1.5, { duration: 500 });

        })
        .onTouchesUp((e)=>{
            console.log('canlse')

        })

    return (
        
        <GestureDetector gesture={gesture}>
            <Animated.View style={{ width: imageSize, height: imageSize }}>
                <Animated.Image source={{uri:"https://res.cloudinary.com/dmrsdkvzl/image/upload/v1695950438/StoryIcon/background/0568a67c761b42364d7db6f58e776079_r3smfh.png"}} style={{width:"100%", height:'100%', resizeMode:'contain'}} />

            </Animated.View>
        </GestureDetector>

    )
}

export default GestureHanle;