import {create} from 'zustand';

export const useStoryStore = create((set) => ({
    typeStory: 0,
    setTypeStory: (type) => set((state) => ({typeStory: type}))
}));

// export default countStore;