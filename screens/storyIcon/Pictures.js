import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, useImage } from '@shopify/react-native-skia'

export default function Pictures({ pictures }) {
    const picture = pictures.length != 0 ? pictures[0] : null;
    if (picture) {
        const image = useImage(picture.picture)
        const pictureInfor = JSON.parse(picture.boundingbox)
        const position = (pictureInfor.position).slice(1, -1).split(',');
        const contentsize = (pictureInfor.contentsize).slice(1, -1).split(',');
        return (
            <>
                <Image image={image} fit={'fill'} x={position[0]/3} y={position[1]/0.6} width={contentsize[0]/2} height={contentsize[1]/2} />
            </>
        )
    }
}

const styles = StyleSheet.create({})