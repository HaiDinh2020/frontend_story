import React, { useEffect, useRef, useState } from "react";
import { Text, Group, useFont } from '@shopify/react-native-skia';
import Sound from "react-native-sound";

let isTextFinish = true;

const Title = ({ title, touchText, isTouch, page, orderTitle, handleOrder }) => {

    const font = useFont(require("../../asserts/fonts/Nasa21-l23X.ttf"), 32);

    const titleText = title.belong_text.text;
    const wordList = titleText.split(" ")

    // vị trí text
    let x = [];
    let y = title.position[0];


    const sync_data = title.belong_text.has_audio[0].sync_data

    const timeout = sync_data ? sync_data.map((item, index) => {
        return item.e - item.s;
    }) : []


    const numWord = timeout.length;
    const ArrayColor = numWord ? Array.from({ length: numWord }, (_, i) => "black") : []

    const [color, setColor] = useState([])
    const [index, setIndex] = useState(0);

    const sendOrder = () => {
        handleOrder(orderTitle+1);
    }
    

    useEffect(() => {
        
        if ( title.page_id == page+1) {
            const soundTitle = new Sound(`${title.belong_text.has_audio[0].file_path}`, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound ', error);
                    return;
                } else {
                    console.log('load sound success')
                    soundTitle.play()
                    setIndex(0)
                    setColor(ArrayColor)
                    isTextFinish = false
                }
            });

            return () => {
                soundTitle.release();
                isTextFinish = true
                setIndex(-1)
                console.log('release sound')
            }
        }
    }, [page, orderTitle])


    useEffect(() => {
        if (!isTextFinish) {
            console.log("index", index, "-", wordList)
            const id = setTimeout(() => {
                let newColor = ArrayColor;
                newColor[index] = 'black' ? 'red' : 'black';
                setColor(newColor);

            }, timeout[index - 1])

            if (numWord > 0 && index >= numWord + 1) {
                setIndex(-1)
                clearTimeout(id)
                sendOrder();
                isTextFinish = true;
            } else
                setIndex(index + 1);
        }
    }, [color])

    useEffect(() => {
        if (isTextFinish) {
            wordList.map((item, index) => {

                if (item == touchText) {
                    let newColor = ArrayColor;
                    newColor[index] = 'black' ? 'red' : 'black';
                    setColor(newColor);
                    setTimeout(() => {
                        newColor[index] = 'black';
                        setColor(newColor)
                    }, 2000)
                }
            })

        }
    }, [isTouch])

    return (
        <Group >
            {
                titleText.split(" ").map((item, index) => {
                    x.push(y)
                    y += font ? font.getTextWidth(item) + font.getTextWidth(" ") : 10;

                    return (
                        <Text key={index} font={font} text={item} color={color[index]} x={x[index]} y={title.position[1]} />
                    )
                })
            }
        </Group>

    )

}

export default Title;