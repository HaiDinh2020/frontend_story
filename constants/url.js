
const ngrokUrl = 'https://4a12-42-114-36-114.ngrok-free.app/'
//adb reverse tcp:8081 tcp:8081

export default {
    getAllData : ngrokUrl + 'api/allData',
    getStories: ngrokUrl + 'api/stories',
    // getStoryById: ngrokUrl + 'api/story/id',
    createText: ngrokUrl + 'api/texts',
    login: ngrokUrl + 'api/login',
    register: ngrokUrl + 'api/register',
    getAudio: ngrokUrl + 'api/audios'
}