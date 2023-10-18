import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useTouchText } from "../../../store/zustandStore";

const Word = ({ word, indexWord, indexTime, touch }) => {

    const [color, setColor] = useState('black');
    const touchText = useTouchText((state) => state.touchText);

    const checkIconText = (word, textIcon) => {
        const wordInTitle = /^[A-Za-z]+$/.test(word[word.length - 1]) ? word.toLowerCase() : word.toLowerCase().slice(0, textIcon.length);
        return textIcon.toLowerCase() === wordInTitle;
    }

    useEffect(() => {
        if(touchText != "" && checkIconText(word, touchText)) {
            console.log('compare', word, touchText)
            setColor('red')
            setTimeout(() => {
                setColor('black')
            }, 2000)
        }
    }, [touch, touchText])

    useEffect(() => {
        if (indexWord == indexTime) {
            setColor('red')
        }
        return () => {
            setColor('black')
        }
    }, [indexTime])

    return (
        <Text style={{ color: color, textAlign:'center', marginVertical: 20 }}>{word} </Text>
    )
}

export default Word;