import React from "react";
import { Canvas, Circle, Group, Image, Rect, useCanvasRef, useImage } from "@shopify/react-native-skia";
import { StyleSheet, View, Text } from "react-native";

function Profile(props) {
    const ref = useCanvasRef();
    const image1 = useImage(require('../asserts/Stories.jpg'))

    return (
        <View style={styles.container}>
            <Canvas style={{ flex: 1, width:300, height:100, backgroundColor:'yellow' }} ref={ref}>
                {/* <Circle r={128} cx={128} cy={128} color="blue" /> */}
                {/* <Image image={image1}  x={0} y={0} width={400} height={200}/> */}
                <Rect width={200} height={250} color={'blue'} />
            </Canvas>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: 'red'
    },
    canvasContainer: {
        flex: 1,
    },
    canvas: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});

export default Profile;