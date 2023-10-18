import {create} from 'zustand';

export const useStoryStore = create((set) => ({
    typeStory: 0,
    setTypeStory: (type) => set((state) => ({typeStory: type}))
}));

export const useTouchText = create((set) => ({
    touchText: "",
    setTouchText: (text) => set((state) => ({touchText: text}))
}))

// export default countStore;