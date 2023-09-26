import { Text, useFont } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import Sound from "react-native-sound";

function Touch ({position, touches}) {

    const font = useFont(require("../../asserts/fonts/Nasa21-l23X.ttf"), 32);
    
    const [touchText, setTouchText] = useState("");
    const [isSoundPlay, setIsSoundPlay] = useState(false);

    let soundPlay;
    const playSound = (sound) => {
        soundPlay = new Sound(`${sound}`, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound ', error);
                return;
            } else {
                soundPlay.play();
                setIsSoundPlay(true);
                console.log("sound play here")
            }
        });
    }
    
    const isInArea = (point, area) => {
        if (point.x > area.star_position[0] && point.y > area.star_position[1]
            && point.x < area.star_position[0] + area.boundingbox[0]
            && point.y < area.star_position[1] + area.boundingbox[1]) {
            return true;
        }
    
        return false;
    }
    
    const handleTouch = () => {
        touches.map((item, index) => {
            if (item) {
                const object = JSON.parse(item.data);
                const objectText = item.belong_text.text;
                const x = position.cx.current;
                const y = position.cy.current;
                if (isInArea({ x, y }, object)) {
                    playSound(item.belong_text.has_audio.audio)
                    
                    setTouchText(objectText);

    
                }
            }
    
        })
    }

    useEffect(() => {
        console.log("position: ", position)
        handleTouch();
        return () => {
            console.log("return here")
            // if(soundPlay) soundPlay.release()
        }
    }, [])

    return (
        < >
            {
                isSoundPlay &&
                <Text font={font} text={touchText} color={'blue'} x={position.cx.current} y={position.cy.current} />
            }
        </>

    )
}

export default Touch;



const dataExamp = {
    "has_touch": [
        {
            "id": 1,
            "page_id": 1,
            "data": "{\"star_position\": [255, 210],\"boundingbox\": [85, 145]}",
            "text_id": 1,
            "belong_text": {
                "id": 1,
                "text": "boy",
                "sync_data": null,
                "has_audio": {
                    "id": 1,
                    "audio": "boy.mp3",
                    "text_id": 1
                }
            }
        },
        {
            "id": 2,
            "page_id": 1,
            "data": "{\"star_position\": [450, 205],\"boundingbox\": [125, 145]}",
            "text_id": 1,
            "belong_text": {
                "id": 1,
                "text": "boy",
                "sync_data": null,
                "has_audio": {
                    "id": 1,
                    "audio": "boy.mp3",
                    "text_id": 1
                }
            }
        },
        {
            "id": 3,
            "page_id": 1,
            "data": "{\"star_position\": [330, 85],\"boundingbox\": [125, 80]}",
            "text_id": 2,
            "belong_text": {
                "id": 2,
                "text": "salad bowl",
                "sync_data": null,
                "has_audio": {
                    "id": 2,
                    "audio": "salad_bowl.mp3",
                    "text_id": 2
                }
            }
        },
        {
            "id": 4,
            "page_id": 1,
            "data": "{\"star_position\": [400, 160],\"boundingbox\": [70, 25]}",
            "text_id": 4,
            "belong_text": {
                "id": 4,
                "text": "fork",
                "sync_data": null,
                "has_audio": {
                    "id": 4,
                    "audio": "fork.mp3",
                    "text_id": 4
                }
            }
        },
        {
            "id": 5,
            "page_id": 1,
            "data": "{\"star_position\": [320, 155],\"boundingbox\": [50, 25]}",
            "text_id": 5,
            "belong_text": {
                "id": 5,
                "text": "spoon",
                "sync_data": null,
                "has_audio": {
                    "id": 5,
                    "audio": "spoon.mp3",
                    "text_id": 5
                }
            }
        }
    ],
}