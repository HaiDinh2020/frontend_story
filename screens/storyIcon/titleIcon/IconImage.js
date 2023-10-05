import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import Sound from 'react-native-sound';


function IconImage({ icon, indexIcon, indexTime, timeIcon }) {

    const rectWith = icon.data.image_width;
    const rectHeight = icon.data.image_height

    const iconSizeWith = useSharedValue(rectWith);
    const iconSizeHeight = useSharedValue(rectHeight);
    const iconNameOpacity = useSharedValue(0)

    const styleIcon = useAnimatedStyle(() => ({
        width: iconSizeWith.value,
        height: iconSizeHeight.value,
    }))

    const styleIconName = useAnimatedStyle(() => ({
        opacity: iconNameOpacity.value,
        top: rectHeight
    }))

    const playSound = (sound) => {
        var audio = new Sound(
            sound,
            null,
            error => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // if loaded successfully
                audio.play();
            },
        );
        return audio;
    }

    const [sound, setSound] = useState()
    const [touch, setTouch] = useState(false);

    const handleTouch = () => {
        if(sound) {
            sound.release();
        }
        setSound(playSound(icon.belong_text.has_audio.audio))
        if (!touch) {
            iconSizeWith.value = withSpring(iconSizeWith.value / 1.5)
            iconSizeHeight.value = withSpring(iconSizeHeight.value / 1.5)
            iconNameOpacity.value = withSpring(1);
        } else {
            iconSizeWith.value = withSpring(rectWith)
            iconSizeHeight.value = withSpring(rectHeight)
            iconNameOpacity.value = withSpring(0);
        }
        setTouch(!touch);
    }

    useEffect(() => {
        if (indexTime == indexIcon) {

            iconSizeWith.value = withSequence(
                withTiming(iconSizeWith.value * 1.5, { duration: timeIcon / 2 }),
                withTiming(iconSizeWith.value, { duration: timeIcon / 2 })
            )
            iconSizeHeight.value = withSequence(
                withTiming(iconSizeHeight.value * 1.5, { duration: timeIcon / 2 }),
                withTiming(iconSizeHeight.value, { duration: timeIcon / 2 })
            )
        }
    }, [indexTime])


    return (
        <View style={[{ width: rectWith, height: rectHeight }, styles.container]} >
            <Animated.View style={styleIcon} onTouchStart={handleTouch}>
                <Animated.Image source={{ uri: icon.belong_text.has_icon.icon }} style={styles.image} />
            </Animated.View>
            <Animated.Text style={[styles.text, styleIconName]}>{icon.belong_text.text}</Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'center',
        position: 'absolute',
        color: 'black',
        width: 200,
        fontSize: 12
    }
})

export default IconImage;