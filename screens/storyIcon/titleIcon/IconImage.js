import React, { useEffect, useRef } from 'react';
import { Group, Image, Rect, useImage, Text, useFont, Circle, Canvas } from '@shopify/react-native-skia';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


function IconImage({ icon, x, y, touch, positionTouch }) {

    const font2 = useFont(require("../../../asserts/fonts/Nasa21-l23X.ttf"), 12);

    const rectWith = icon.data.image_width / 2;
    const rectHeight = icon.data.image_height / 2
    const iconImage = useImage(icon.belong_text.has_icon.icon)

    const iconWith = useSharedValue(rectWith);
    const iconHeight = useSharedValue(rectHeight);
    // const iconHeight = useDerivedValue(() => iconWith);
    const iconText = useSharedValue('');


    
    const hello = useRef(true)
    useEffect(() => {
        
        if(hello.current) {

            if(positionTouch && positionTouch.x > x && positionTouch.y > (y - rectHeight / 1.5) && positionTouch.x < x+rectHeight && positionTouch.y < (y - rectHeight / 1.5) + rectWith) {
                console.log('this is icon', icon.belong_text.text)
                iconHeight.value = withTiming(iconHeight.value+50, { duration: 1000 })
                iconText.value =icon.belong_text.text
            }
        }
        return () => {
            hello.current = !hello.current;
        }
           
    }, [touch])

    const size = 256;
  const r = useSharedValue(0);
  const c = useDerivedValue(() => size - r.value);
  useEffect(() => {
    r.value = withRepeat(withTiming(size * 0.33, { duration: 1000 }), -1);
  }, [r, size]);

    return (
        <Group >
            <Rect width={rectWith} height={iconHeight} x={x} y={y - rectHeight / 1.5} color={'red'} opacity={0.6}/>
            <Text font={font2} text={iconText.value} x={x} y={y+20} />
            <Image fit={'fill'} image={iconImage} width={iconWith.value} height={iconHeight.value} x={x} y={y } />
        </Group>
        // <Animated.Image source={{uri:icon.belong_text.has_icon.icon }} style={{position:'absolute', width: iconWith, height:iconHeight, left:x, top:y}} />
    )
}

export default IconImage;