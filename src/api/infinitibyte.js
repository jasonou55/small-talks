import axios from 'axios';

const api_host = process.env.VUE_APP_INFINITIBYTE_API_HOST
const access_token = process.env.VUE_APP_INFINITIBYTE_ACCESS_TOKEN
const infinitiByteService = axios.create({
    baseURL: api_host,
    timeout: 5000
});

const config = {
    headers: {
        'Authorization': 'Bearer ' + access_token
    }
};

export function openAiChat(data) {
    let response = infinitiByteService.post('/api/private/chat', data, config);
    console.log('Get response:');
    console.log(response.data);
    return response;
}