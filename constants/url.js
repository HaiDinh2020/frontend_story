
const ngrokUrl = 'https://121a-42-114-186-12.ngrok-free.app/'
//adb reverse tcp:8081 tcp:8081

export default {
    getAllData : ngrokUrl + 'api/allData',
    getStories: ngrokUrl + 'api/stories',
    // getStoryById: ngrokUrl + 'api/story/id',
    login: ngrokUrl + 'api/login',
    register: ngrokUrl + 'api/register',
    getAudio: ngrokUrl + 'api/audios'
}