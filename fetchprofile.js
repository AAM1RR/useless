const axios = require('axios');

// Define the access token
const accessToken = 'BQAy_mZZzr-86UlOmv-OfDKtoD_jXiKmkyRDtoc81dEZJm5J3iw8fXnmyb8mTXEf8WBl8TzaqTgOH-XDDsRdROjPl7sjRXesqydMDcs_yAXPh9026sKUqyoj72lvClPTFGKZSA5oN8Fwb_BlAdROUtQRGlgYpR9NqwFNsSA0ny8Mj7XbxqI-DqeKtSCyY_YW0NHZ6Q5c4yABrAegofoxaGxg6rU_Hw';

// Make the request to the Spotify API
axios.get('https://api.spotify.com/v1/me', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
.then(response => {
    console.log('User Profile:', response.data);
})
.catch(error => {
    console.error('Error fetching profile:', error);
});

