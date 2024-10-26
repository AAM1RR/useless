const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8888;

const clientId = 'd38bdbbcecd64c2ba42317702c068494';
const clientSecret = '8ebfc546ca784886a9a30c587d0fca10';
const redirectUri = 'http://localhost:8888/callback';
let accessToken = 'BQAy_mZZzr-86UlOmv-OfDKtoD_jXiKmkyRDtoc81dEZJm5J3iw8fXnmyb8mTXEf8WBl8TzaqTgOH-XDDsRdROjPl7sjRXesqydMDcs_yAXPh9026sKUqyoj72lvClPTFGKZSA5oN8Fwb_BlAdROUtQRGlgYpR9NqwFNsSA0ny8Mj7XbxqI-DqeKtSCyY_YW0NHZ6Q5c4yABrAegofoxaGxg6rU_Hw';  // Add your access token here

app.use(cors());

app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId +
        (scope ? '&scope=' + encodeURIComponent(scope) : '') +
        '&redirect_uri=' + encodeURIComponent(redirectUri));
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
            },
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            }).toString()
        });
        accessToken = response.data.access_token;
        res.redirect('/');
    } catch (error) {
        console.error('Error getting access token:', error.response ? error.response.data : error.message);
        res.status(500).send('Error getting access token');
    }
});

app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                q: query,
                type: 'track'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error searching tracks:', error.response ? error.response.data : error.message);
        res.status(500).send('Error searching tracks');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
