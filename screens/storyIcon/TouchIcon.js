import { Path, Rect, Skia, Text, useFont, useValue } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import Sound from "react-native-sound";
import pointInPolygon from 'point-in-polygon'
import { HEIGHT, WITH } from "../../constants";
import { Dimensions } from "react-native";
import { useTouchText } from "../../store/zustandStore";


function TouchIcon({ position, touches, touch }) {

    const height = Dimensions.get('screen').height
    const font = useFont(require("../../asserts/fonts/Nasa21-l23X.ttf"), 20);

    const touchText = useTouchText((state) => state.touchText);
    const setTouchText = useTouchText((state) => state.setTouchText)
    // const [sound, setSound] = useState()
    const [isTouch, setIsTouch] = useState(false)
    const [touchTimeout, setTouchTimeout] = useState();
    
    const xText = useValue(0);
    const yText = useValue(0);

    const playSound = (sound) => {
        const soundPlay = new Sound(`${sound}`, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound ', error);
                return;
            } else {
                soundPlay.play();
            }
        });
        // return soundPlay;
    }

    function convertCoordinates(coordinates) {
        const convertedCoordinates = coordinates?.map((coordinate) => coordinate.slice(1, -1).split(','));
        return convertedCoordinates?.map((coordinate) => [parseInt(coordinate[0]) / 2.24, height - parseInt(coordinate[1]) / 2.13]);
    }

    const isInArea = (point, area) => {

        return area && pointInPolygon(point, area);
    }


    useEffect(() => {
        setTouchText('')
        touches?.map((item, index) => {
            const vertices = convertCoordinates(JSON.parse(item.data).vertices);
            const objectText = item.belong_text.text;
            const x = position.cx.current;
            const y = position.cy.current;
            if (isInArea([x, y], vertices)) {
                if (touchTimeout) {
                    clearTimeout(touchTimeout);
                    setIsTouch(false);
                }
                xText.current = x;
                yText.current = y;
                playSound(item.belong_text.has_audio.audio)
                setTouchText(objectText);
                setIsTouch(true);
                console.log('touch arre')
                setTouchTimeout(
                    setTimeout(() => {
                        setIsTouch(false);
                    }, 1000)
                )
            }
        })

    }, [touch])

    return (
        <>
            {
                isTouch && <Text font={font} text={touchText} color={'blue'} x={xText.current+10} y={yText.current+10} />
            }
        </>

    )
}

export default TouchIcon;

