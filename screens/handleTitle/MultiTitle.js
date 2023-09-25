import React, { useEffect, useState } from 'react';

import Title from './Title';

function MultiTitle({ title, touchText, isTouch, page, textFinish }) {
    
    const initOrder = title.length > 0 ? [true, ...Array(title.length-1).fill(false)] : [true];
    const [orderTitleDisplay, setOrderTitleDisplay] = useState(initOrder)
    const [orderTitle, setOrderTitle] = useState(0);

    const handleOrder = (index) => {
        // console.log("index: ",index, " length: ", title.length)
        if(index < title.length) {
            setOrderTitle(index)
            let array  = Array(title.length).fill(false)
            array[index] = true;
            setOrderTitleDisplay(array);
        } else {
            setOrderTitle(index-1)
        }
    }

    useEffect(() => {
        setOrderTitle(0);
        setOrderTitleDisplay(initOrder)
    }, [page])

    return (
        orderTitleDisplay[orderTitle] != null && orderTitleDisplay[orderTitle] && <Title title={title[orderTitle]} touchText={touchText} isTouch={isTouch} page={page} handleOrder={handleOrder} orderTitle={orderTitle}/>
        
    );
}

export default MultiTitle;