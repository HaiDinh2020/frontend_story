import React, { useEffect, useRef, useState } from "react";
import { Canvas, Circle, Image, vec, Rect, Text, useCanvasRef, useFont, useImage, Skia, Path, Vertices, useTouchHandler, useValue, Group, useComputedValue } from "@shopify/react-native-skia";
import { StyleSheet, View, Dimensions, ScrollView, Text as TextNative, SafeAreaView } from "react-native";
import Sound from "react-native-sound";
import MultiTitle from "./handleTitle/MultiTitle";
import Touch from "./handleTouch/Touch";

// Enable playback in silence mode
Sound.setCategory('Playback');

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


function PageDetail({ page, currentPage }) {


    const image1 = useImage(page.background)
    const touches = page.has_touch;

    const [touchText, setTouchText] = useState("");
    const [isTouchObject, setIsTouchObject] = useState(false);

    const title = page.has_text_config;


    const handleSetIsTouchObject = (value) => {
        setTouchText(value)
        setIsTouchObject(!isTouchObject)
    }

    // touch success
    const [isTouch, setIsTouch] = useState(false)
    const cx = useValue(100);
    const cy = useValue(100);

    const touchHandler = useTouchHandler({
        onStart: ({ x, y }) => {

            cx.current = x;
            cy.current = y;
            setIsTouch(true);
        },
        onActive: ({ x, y }) => {
            cx.current = x;
            cy.current = y;
        },
        onEnd: () => {
            setTimeout(() => {
                setIsTouch(false)
            }, 2000)
        }
    });

    return (
        <SafeAreaView style={styles.container}>

            <Canvas style={styles.container} onTouch={touchHandler} >
                <Image image={image1} fit={'fill'} x={0} y={0} width={width > height ? width : height} height={height < width ? height : width} />
                <Group >
                    <Rect x={750} y={0} width={30} height={40} color={'red'} />
                    <Rect x={755} y={8} width={20} height={2} color={'blue'} />
                    <Rect x={755} y={19} width={20} height={2} color={'blue'} />
                    <Rect x={755} y={29} width={20} height={2} color={'blue'} />
                </Group>
                <MultiTitle title={title} touchText={touchText} isTouch={isTouchObject} page={currentPage} />
                {isTouch &&
                    <Touch position={{ cx, cy }} touches={touches} handleSetIsTouchObject={handleSetIsTouchObject} />
                }
            </Canvas>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrap: {
        width: width,
        height: height,
        backgroundColor: 'blue'
    }
});

export default PageDetail;
