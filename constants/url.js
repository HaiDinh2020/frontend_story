
const ngrokUrl = 'https://e8ef-222-252-17-100.ngrok-free.app/'
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