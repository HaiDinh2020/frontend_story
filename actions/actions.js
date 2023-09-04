export const increment = () => {
    return {
        type: 'INCREMENT',
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT',
    };
};

export const loadStory = (story) => {
    return {
        type: 'loadStory',
        payload: story,
    };
}