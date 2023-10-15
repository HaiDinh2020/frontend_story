import { Path, Rect, Skia, Text, useFont } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import Sound from "react-native-sound";
import pointInPolygon from 'point-in-polygon'
import { HEIGHT, WITH } from "../../constants";
import { Dimensions } from "react-native";


function TouchIcon({ position, touches, isTouch }) {

    const height = Dimensions.get('screen').height
    const font = useFont(require("../../asserts/fonts/Nasa21-l23X.ttf"), 32);

    const [touchText, setTouchText] = useState("");
    const [isSoundPlay, setIsSoundPlay] = useState(false);
    const [sound, setSound] = useState()

    const playSound = (sound) => {
        const soundPlay = new Sound(`${sound}`, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound ', error);
                return;
            } else {
                soundPlay.play();
                setIsSoundPlay(true);
            }
        });
        return soundPlay;
    }

    function convertCoordinates(coordinates) {
        const convertedCoordinates = coordinates?.map((coordinate) => coordinate.slice(1, -1).split(','));
        return convertedCoordinates?.map((coordinate) => [parseInt(coordinate[0]) / 2.24, height - parseInt(coordinate[1]) / 2.13]);
    }

    const isInArea = (point, area) => {

        return area && pointInPolygon(point, area);
    }



    const handleTouch = () => {
        touches?.map((item, index) => {
            const vertices = convertCoordinates(JSON.parse(item.data).vertices);
            const objectText = item.belong_text.text;
            const x = position.cx.current;
            const y = position.cy.current;
            if (isInArea([x, y], vertices)) {
                // console.log("positon", position)
                // console.log('item', item)
                setSound(playSound(item.belong_text.has_audio.audio))
                setTouchText(objectText);
            }
        })

    }

    useEffect(() => {
        handleTouch();
        return () => {
            setTouchText("");
            if (sound) sound.release();
        }
    }, [isTouch])

    // const path = Skia.Path.Make();


    // const vertices2 =  convertCoordinates(touches[0]?.data.vertices);;
    // console.log(JSON.parse(touches[0].data).vertices)
    // path.moveTo(70, 50)
    // vertices2.map((item, index) => {
    //     console.log(1, item)
    //     // path.lineTo()
       
    // })

    return (
        <>

            {/* <Path
                path={path}
                color="blue"
            /> */}
            {
                
                // <Rect 
                <Text font={font} text={touchText} color={'blue'} x={position.cx.current} y={position.cy.current} />
            }
        </>

    )
}

export default TouchIcon;

