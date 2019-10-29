const axios = require('axios');
const env = require('../AppEnvironment');

const post = async (url, body, config) => {
    url = env.src + url;
    try {
        const result = await axios.post(url, body, config);
        return result.data;
    }
    catch(err){
        throw err;
    }
};

const get = async (url, auth, loadAs) => {
    url = env.src + url;
    const config = {
        withCredentials: true,
        auth,
        headers: {
            'Content-Type': 'text/plain'
        }
    };

    try {
        let res = await axios.get(url,config);
        return res.data;
    }
    catch(err){
        throw err;
    }
};

module.exports = {
    get,
    post
};