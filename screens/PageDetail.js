import React, { useEffect, useRef, useState } from "react";
import { Canvas, Circle, Image, vec, Rect, Text, useCanvasRef, useFont, useImage, Skia, Path, Vertices, useTouchHandler, useValue, Group, useComputedValue } from "@shopify/react-native-skia";
import { StyleSheet, View, Dimensions, ScrollView, Text as TextNative, SafeAreaView } from "react-native";
import Sound from "react-native-sound";
import Swiper from "react-native-swiper";
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
        onEnd: () => {
            setTimeout(() => {
                setIsTouch(false)
            }, 2000)
        }
    });

    




    // vẽ 

    const vertices = [
        "{710,577}",
        "{714,558}",
        "{728,517}",
        "{750,485}",
        "{772,473}",
        "{783,467}",
        "{787,455}",
        "{853,455}",
        "{854,467}",
        "{873,475}",
        "{899,490}",
        "{929,537}",
        "{937,579}",
        "{931,580}",
        "{931,586}",
        "{928,587}",
        "{924,588}",
        "{920,589}",
        "{915,592}",
        "{909,591}",
        "{905,588}",
        "{904,597}",
        "{902,600}",
        "{898,600}",
        "{892,599}",
        "{883,594}",
        "{876,588}",
        "{875,585}",
        "{870,583}",
        "{864,579}",
        "{858,580}",
        "{827,579}",
        "{812,587}",
        "{799,587}",
        "{793,585}",
        "{789,581}",
        "{783,578}",
        "{769,580}",
        "{764,587}",
        "{760,588}",
        "{754,590}",
        "{753,592}",
        "{745,597}",
        "{732,595}",
        "{727,595}",
        "{722,591}",
        "{719,587}",
        "{719,581}",
        "{716,580}"
    ]
    // const path = useComputedValue(() => {
    //     const p = Skia.Path.Make();
    //     p.moveTo(70, 50)
    //     vertices.map((item, index) => {
    //         const [x, y] = item.split(",")
    //         path.lineTo(Number(x.slice(1, x.length)) / width * 340, Number(y.slice(0, -1)) / width * 340)
    //         // vertices2.push(vec(Number(x.slice(1, x.length)) / width * 340, Number(y.slice(0, -1)) / width * 340))
    //     })
        
    // })
    const path = Skia.Path.Make();


    const vertices2 = [];

    path.moveTo(70, 50)
    vertices.map((item, index) => {
        const [x, y] = item.split(",")
        path.lineTo(Number(x.slice(1, x.length)) / 2.18,height - Number(y.slice(0, -1)) / 2.18)
        vertices2.push(vec(Number(x.slice(1, x.length)) / width * 360, Number(y.slice(0, -1)) / width * 360))
    })

    
    

    path.close();

    const [isSwiper, setIsSwiper] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            < Swiper
                // style={styles.wrap}
                horizontal={false}
                loop={false}
                showsButtons={false}
                // autoplay
                onIndexChanged={() => {
                    console.log('swiper', isSwiper)
                    setIsSwiper(!isSwiper)
                    console.log('isswiper', isSwiper)
                }}
            >

                <Canvas style={styles.container} onTouch={touchHandler} >
                    <Image image={image1} fit={'fill'} x={0} y={0} width={width} height={height} />
                    <Group >
                        <Rect x={750} y={0} width={30} height={40} color={'red'} />
                        <Rect x={755} y={8} width={20} height={2} color={'blue'} />
                        <Rect x={755} y={19} width={20} height={2} color={'blue'} />
                        <Rect x={755} y={29} width={20} height={2} color={'blue'} />
                    </Group>
                    <Circle cx={cx} cy={cy} r={5} color="red" />
                    {
                        !isSwiper && <MultiTitle title={title} touchText={touchText} isTouch={isTouchObject} page={currentPage} />
                    }

                    {isTouch && 
                        <Touch position={{cx, cy}} touches={touches} handleSetIsTouchObject={handleSetIsTouchObject} />
                    }



                    <Path
                        path={path}
                        color="blue"
                    >

                    </Path>
                </Canvas>


                {/* <Canvas style={styles.wrap} onTouch={touchHandler} >
                    <Image image={image1} fit={'fill'} x={0} y={0} width={width} height={height} />
                    <Group >
                    <Rect x={750} y={0} width={30} height={40} color={'red'} />
                        <Rect x={755} y={8} width={20} height={2} color={'blue'} />
                        <Rect x={755} y={19} width={20} height={2} color={'blue'} />
                        <Rect x={755} y={29} width={20} height={2} color={'blue'} />
                    </Group>
                    <Circle cx={cx} cy={cy} r={5} color="red" />
                    {
                        isSwiper && <MultiTitle title={title} touchText={touchText} isTouch={isTouch} page={currentPage} />
                    }
                    {isTouch &&
                        <Text font={font} text={touchText} color={'blue'} x={touchPosition[0]} y={touchPosition[1]} />
                    }
                </Canvas> */}


            </Swiper>

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
        backgroundColor:'blue'
    }
});

export default PageDetail;
