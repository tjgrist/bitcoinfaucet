import axios from "axios";

// create the axios instance
const paxosAxios = axios.create({
    baseURL: process.env.PAXOS_API_URL,
});

/**
 * gets a new access token from paxos
 */
async function getNewToken() {
    const clientId = process.env.PAXOS_CLIENT_ID as string;
    const clientSecret = process.env.PAXOS_CLIENT_SECRET as string;
    const tokenEndpoint = `${process.env.PAXOS_AUTH_URL}/oauth2/token`;

    const body = new URLSearchParams({
        grant_type: 'client_credentials',
        scope: process.env.PAXOS_SCOPES as string,
        client_id: clientId,
        client_secret: clientSecret
    });

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    const { data } = await axios.post(tokenEndpoint, body, config);

    return data.access_token;
}

// add the token to all axios calls using an interceptor
paxosAxios.interceptors.request.use(async (config) => {
    if (!config.headers.Authorization) {
        const token = await getNewToken();
        console.log('No token, getting new token', token);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// set up an interceptor so that if there is a unauthorized error from paxos to refetch the token
paxosAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, data, response } = error;
        // if unauthorized
        if (error?.status === 401) {
            // refresh the token
            const token = await getNewToken();
            
            // try again with the new token
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Unauthorized, refreshing token', config.headers.Authorization, token, error.response.status);
            return paxosAxios(config);
        }
        if (data?.status === 403) {
            console.error(error.data)
        }
        if (data?.status === 429) {
            console.error('Rate limited', error);
        }
        if (data?.status_code === 400) {
            console.error('Bad request', error);
        }

        // else pass the error through
        console.log(response)
        return response;
    }
);

export default paxosAxios;