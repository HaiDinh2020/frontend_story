import React, { useEffect, useRef, useState } from "react";
import { Canvas, Circle, Image, vec, Rect, Text, useCanvasRef, useFont, useImage, Skia, Path, Vertices, useTouchHandler, useValue, Group } from "@shopify/react-native-skia";
import { StyleSheet, View, Dimensions, ScrollView, Text as TextNative, SafeAreaView } from "react-native";
import Sound from "react-native-sound";
import Swiper from "react-native-swiper";
import { handleMultiTitle } from "../actions/actions";
import MultiTitle from "./handleTitle/MultiTitle";


// Enable playback in silence mode
Sound.setCategory('Playback');

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

let isSoundPlay = true;
let setLengthTitleInRedux = true;

function PageDetail({ page, currentPage }) {

    const font = useFont(require("../asserts/fonts/Nasa21-l23X.ttf"), 32);

    const ref = useCanvasRef();

    const image1 = useImage(page.background)
    const touches = page.has_touch;

    const [touchText, setTouchText] = useState("");

    const title = page.has_text_config;

    const [sound, setSound] = useState(null)


    const playSound = () => {
        const soundPlay = new Sound(`${sound}`, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound ', error);
                return;
            } else {
                soundPlay.play();
            }
        });
    }

    // touch success
    const [isTouch, setIsTouch] = useState(false)
    const [touchPosition, setTouchPositon] = useState([10, 10])



    const isInArea = (point, area) => {
        if (point.x > area.star_position[0] && point.y > area.star_position[1]
            && point.x < area.star_position[0] + area.boundingbox[0]
            && point.y < area.star_position[1] + area.boundingbox[1]) {
            return true;
        }

        return false;
    }

    const cx = useValue(100);
    const cy = useValue(100);

    const touchHandler = useTouchHandler({
        onStart: ({ x, y }) => {
            cx.current = x;
            cy.current = y;
            touches.map((item, index) => {
                if(item) {
                    const object = JSON.parse(item.data);
                    const objectText = item.belong_text.text;
    
                    if (isInArea({ x, y }, object)) {
    
                        setTouchText(objectText);
                        isSoundPlay = true;
                        setSound(item.belong_text.has_audio.audio);
                        setIsTouch(true)
    
                        setTouchPositon([x, y])
                        return;
                    }
                }
                
            })
        },
    });

    setTimeout(() => {
        setIsTouch(false)
    }, 2000)


    useEffect(() => {
        if (setLengthTitleInRedux) {
            setLengthTitleInRedux = true;
            // console.log(1, title.length, " - ",  currentPage)
        }

        return () => {
            setLengthTitleInRedux = true;
        }

    }, [])


    useEffect(() => {
        if (isSoundPlay) {
            isSoundPlay = false;
            playSound();
        }
    }, [isTouch])



    // vẽ 

    // const vertices = [
    //     "{710,577}",
    //     "{714,558}",
    //     "{728,517}",
    //     "{750,485}",
    //     "{772,473}",
    //     "{783,467}",
    //     "{787,455}",
    //     "{853,455}",
    //     "{854,467}",
    //     "{873,475}",
    //     "{899,490}",
    //     "{929,537}",
    //     "{937,579}",
    //     "{931,580}",
    //     "{931,586}",
    //     "{928,587}",
    //     "{924,588}",
    //     "{920,589}",
    //     "{915,592}",
    //     "{909,591}",
    //     "{905,588}",
    //     "{904,597}",
    //     "{902,600}",
    //     "{898,600}",
    //     "{892,599}",
    //     "{883,594}",
    //     "{876,588}",
    //     "{875,585}",
    //     "{870,583}",
    //     "{864,579}",
    //     "{858,580}",
    //     "{827,579}",
    //     "{812,587}",
    //     "{799,587}",
    //     "{793,585}",
    //     "{789,581}",
    //     "{783,578}",
    //     "{769,580}",
    //     "{764,587}",
    //     "{760,588}",
    //     "{754,590}",
    //     "{753,592}",
    //     "{745,597}",
    //     "{732,595}",
    //     "{727,595}",
    //     "{722,591}",
    //     "{719,587}",
    //     "{719,581}",
    //     "{716,580}"
    // ]
    // const path = Skia.Path.Make();


    // const vertices2 = [];


    // vertices.map((item, index) => {
    //     const [x, y] = item.split(",")
    //     path.lineTo(Number(x.slice(1, x.length)) / 1200 * 600, Number(y.slice(0, -1)) / 1200 * 600)
    //     vertices2.push(vec(Number(x.slice(1, x.length)) / 1200 * 600, Number(y.slice(0, -1)) / 1200 * 600))
    // })
    // path.close();

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

                <Canvas style={styles.wrap} onTouch={touchHandler} >
                    <Image image={image1} fit={'fill'} x={0} y={0} width={width} height={height} />
                    <Group >
                        <Rect x={750} y={0} width={30} height={40} color={'red'} />
                        <Rect x={755} y={8} width={20} height={2} color={'blue'} />
                        <Rect x={755} y={19} width={20} height={2} color={'blue'} />
                        <Rect x={755} y={29} width={20} height={2} color={'blue'} />
                    </Group>
                    <Circle cx={cx} cy={cy} r={5} color="red" />
                    {/* {console.log('redner view', currentPage)} */}
                    {
                        !isSwiper && <MultiTitle title={title} touchText={touchText} isTouch={isTouch} page={currentPage} />
                    }

                    {isTouch &&
                        <Text font={font} text={touchText} color={'blue'} x={touchPosition[0]} y={touchPosition[1]} />
                    }

                    {/* <Path
                        path={path}
                        color="lightblue"
                    /> */}
                </Canvas>


                <Canvas style={styles.wrap} onTouch={touchHandler} >
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
                </Canvas>


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
    }
});

export default PageDetail;