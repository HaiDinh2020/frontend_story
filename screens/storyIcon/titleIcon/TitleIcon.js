import React, { useEffect, useState } from "react";
import IconImage from "./IconImage";
import Word from "./Word";
import Sound from "react-native-sound";
import { useStoryStore } from "../../../store/zustandStore";

const TitleIcon = ({ title, icons, isFling }) => {


    const titleIcon = JSON.parse(title?.belong_text.sync_data);

    const checkIconText = (word, textIcon) => {
        const wordInTitle = /^[A-Za-z]+$/.test(word[word.length - 1]) ? word.toLowerCase() : word.toLowerCase().slice(0, textIcon.length);
        return textIcon.toLowerCase() === wordInTitle;
    }

    function handleIcon(word) {
        let isIcon = false;
        let icon = null
        if (!isIcon) {
            icons.map((item, index) => {
                if (checkIconText(word, item.belong_text.text)) {
                    isIcon = true;
                    icon = item
                }
            })
        }

        return isIcon ? icon : false;
    }

    const typeStory = useStoryStore((state) => state.typeStory);
    const [loadSuccess, setLoadSuccess] = useState(false);
    const [indexTime, setIndexTime] = useState(0);

    let currentTime = 0;
    useEffect(() => {
        console.log('hello world titleIcon', typeStory)
        
        if (isFling) {
            var audio = new Sound(
                title.belong_text.has_audio.audio,
                null,
                error => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        return;
                    }
                    // if loaded successfully
                    setLoadSuccess(true)
                    audio.play();
                },
            );
        }
        return () => {
            setLoadSuccess(false);
            if(audio) {
                audio.release();
            }
            setIndexTime(-1);
        }
    }, [isFling])

    useEffect(() => {
        if (loadSuccess) {
            var id = setInterval(() => {
                currentTime += 100;
                titleIcon.map((item, index) => {
                    if (item.s <= currentTime && item.e >= currentTime) {
                        setIndexTime(index)
                    }
                })
                if (currentTime >= titleIcon[(titleIcon.length - 1)].e) {
                    clearInterval(id);
                    setIndexTime(-1);
                }
            }, 100)
        }
        return () => {
            setIndexTime(-1)
            clearInterval(id);
        }
    }, [loadSuccess])

    return (
        <>
            {
                titleIcon?.map((item, index) => {
                    if (typeStory == 1 && handleIcon(item.w)) {
                        const icon = handleIcon(item.w)
                        return (
                            <IconImage key={index} icon={icon} indexIcon={index} indexTime={indexTime} timeIcon={item.e - item.s} />
                        )
                    } else {
                        return (
                            <Word key={index} word={item.w} indexWord={index} indexTime={indexTime} />
                        )
                    }

                })
            }
        </>
    )
}

export default TitleIcon;