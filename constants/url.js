
const ngrokUrl = 'https://cf1e-222-252-17-100.ngrok-free.app/'

export default {
    getAllData : ngrokUrl + 'api/allData',
    getStories: ngrokUrl + 'api/stories',
    // getStoryById: ngrokUrl + 'api/story/id',
    login: ngrokUrl + 'api/login',
    register: ngrokUrl + 'api/register',
    getAudio: ngrokUrl + 'api/audios'
}