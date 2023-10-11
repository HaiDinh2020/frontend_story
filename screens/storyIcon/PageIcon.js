import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { Canvas, Rect, useFont, Image, useImage, useTouchHandler, useValue, Path, Skia, vec } from '@shopify/react-native-skia';
import TitleIcon from './titleIcon/TitleIcon';
import { View } from 'react-native';
import TouchIcon from './TouchIcon';
import { HEIGHT, WITH } from '../../constants';
import { Text } from 'react-native';
import Pictures from './Pictures';


function PageIcon({ page, cx, cy, isTouch, isFling }) {

    const { width, height } = Dimensions.get('screen')

    const background = useImage(page.background);
    const text_config = page.has_text_config
    const title = text_config[0]
    const icons = page.has_touch
    const touches = page.has_touch
    const picture = page.has_picture
    const boundingbox = title.position.split(",").map((item, index) => Number(item.match(/[0-9]+/g)))

    return (
        <SafeAreaView style={styles.container}>
            <Canvas style={styles.container} >
                <Image image={background} fit={'fill'} x={0} y={0} width={width} height={height} />
                <Pictures pictures={picture} />
                {
                    isTouch && <TouchIcon position={{ cx, cy }} touches={touches} isTouch={isTouch} />
                }
            </Canvas>
            <View style={styles.roundTitle}>
                <View style={styles.title}>
                    <TitleIcon title={title} icons={icons} isFling={isFling} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',

    },
    roundTitle: {
        position: 'absolute',
        paddingHorizontal: 120,
        width: WITH > HEIGHT ? WITH : HEIGHT
    },
    title: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default PageIcon;
