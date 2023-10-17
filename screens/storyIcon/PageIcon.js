import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Text, View } from 'react-native'
import { Canvas, Rect, useFont, Image, useImage, useTouchHandler, useValue, Path, Skia, vec } from '@shopify/react-native-skia';
import TitleIcon from './titleIcon/TitleIcon';
import TouchIcon from './TouchIcon';
import { HEIGHT, WITH } from '../../constants';
import Pictures from './Pictures';


function PageIcon({ page, cx, cy, touch, isFling }) {

    const { width, height } = Dimensions.get('screen')

    const background = useImage(page.background);
    const text_config = page.has_text_config
    const title = text_config[0]
    const icons = page.has_touch
    const touches = page.has_touch
    const picture = page.has_picture
    const boundingbox = title.position.split(",").map((item, index) => Number(item.match(/[0-9]+/g)))

    // function convertCoordinates(coordinates) {
    //     const convertedCoordinates = coordinates?.map((coordinate) => coordinate.slice(1, -1).split(','));
    //     return convertedCoordinates?.map((coordinate) => [parseInt(coordinate[0]) / 2.24, height - parseInt(coordinate[1]) / 2.13]);
    // }

    // const path = Skia.Path.Make();

    // const vertices2 = convertCoordinates(JSON.parse(touches[3]?.data).vertices);
    // // console.log(convertCoordinates(JSON.parse(touches[0].data).vertices))
    // path.moveTo(100, 50)
    // vertices2.map((item, index) => {
    //     console.log(1, item)
    //     path.lineTo(item[0], item[1])
    // })

    return (
        <SafeAreaView style={styles.container}>
            <Canvas style={styles.container} >
                <Image image={background} fit={'fill'} x={0} y={0} width={width} height={height} />
                <Pictures pictures={picture} />
                <TouchIcon position={{ cx, cy }} touches={touches} touch={touch} />
                {/* <Path
                    path={path}
                    color="blue"
                /> */}
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
        width: WITH > HEIGHT ? WITH : HEIGHT,
    },
    title: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default PageIcon;
