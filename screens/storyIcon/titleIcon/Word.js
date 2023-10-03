import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const Word = ({ word, indexWord, indexTime }) => {

    const [color, setColor] = useState('black');
    useEffect(() => {
        if (indexWord == indexTime) {
            setColor('red')
        }
        return () => {
            setColor('black')
        }
    }, [indexTime])

    return (
        <Text style={{ color: color }}>{word} </Text>
    )
}

export default Word;