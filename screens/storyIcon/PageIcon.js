import React from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native'
import DataStoryIcon from './DataStoryIcon';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { WITH, HEIGHT } from '../../constants';


function PageIcon(props) {

    const pagesIcon = DataStoryIcon.has_page;
    const background = useImage(pagesIcon[0].background)
    console.log(background)
    return (
        <SafeAreaView style={styles.container}>
            <Canvas  style={styles.container}>
                <Image image={background} fit={'fill'} x={0} y={0} width={WITH < HEIGHT ? HEIGHT : WITH} height={HEIGHT > WITH ? WITH : HEIGHT } />
            </Canvas>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PageIcon;