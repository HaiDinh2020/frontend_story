import React, { useEffect } from "react";
import { Text,  Group, useFont, Image, useImage, Canvas } from '@shopify/react-native-skia';
// import {Text } from 'react-native'
import IconImage from "./IconImage";

const TitleIcon = ({title, icons, touch, positionTouch}) => {

    const font = useFont(require("../../../asserts/fonts/Nasa21-l23X.ttf"), 32);

    const titleIcon = title?.belong_text.sync_data;
    let x = [];
    let x1 =  title ? JSON.parse(title.position)[0] : 150;
    
    let y1 = title ? JSON.parse(title.position)[1] : 50;

    const checkIconText = (word, textIcon) => {
        const wordInTitle = /^[A-Za-z]+$/.test(word[word.length-1]) ?  word.toLowerCase() : word.toLowerCase().slice(0,textIcon.length);
        return textIcon.toLowerCase() === wordInTitle;
    }

    function handleIcon (word)  {
        let isIcon = false;
        let icon = null
        if(!isIcon) {
            icons.map((item, index) => {
                if(checkIconText(word, item.belong_text.text)) {
                    isIcon = true;
                    icon = item
                    // console.log(index, item.belong_text.text)
                    // return ;
                }
            })
        }
        
        return isIcon ? icon : false;
    }


    return (
        <Group>
            {
                titleIcon.map((item, index) => {
                    
                    if(x1 > 600) {
                        y1 += 60;
                        x1 = title ? JSON.parse(title.position)[0] : 150;
                    }
                    x.push(x1)
                    
                    if(handleIcon(item.w)) {
                        const icon = handleIcon(item.w)
                        const iconWith = icon.data.image_width/2;
                        x1 += iconWith + font?.getTextWidth(" ");
                        return (
                            <>
                            <IconImage key={index} icon={icon} x={x[index]} y={y1} touch={touch} positionTouch={positionTouch}  />
                            </>
                        )
                    } else {
                        x1 += font ? font.getTextWidth(item.w) + font.getTextWidth(" ") : 10

                        return (
                                // <Text style={{position:'absolute', top:y1, left: x[index]}}>{item.w}</Text>

                                <Text key={index} font={font} text={item.w}  x={x[index]} y={y1} />
                            
                        )
                    }
                     
                    
                })
            }
        </Group>
    )
}

export default TitleIcon;