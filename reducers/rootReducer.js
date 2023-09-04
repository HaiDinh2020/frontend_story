const initialState = {
    stories: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'loadStory':
            return {
                ...state,
                stories: action.payload
            };
        default:
            return state;
    }
}

export default rootReducer;