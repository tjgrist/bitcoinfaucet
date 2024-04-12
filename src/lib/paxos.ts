import axios from "axios";

let token: string;

// create the axios instance
const paxosAxios = axios.create({
    baseURL: process.env.PAXOS_API_URL,
});


/**
 * gets a new JWT from paxos
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

    token = data.access_token;

    // add the JWT to all axios calls using an interceptor
    paxosAxios.interceptors.request.use((config) => {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
    return token;
}

// set up an interceptor so that if there is a unauthorized error from PT to refetch the JWT
paxosAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        // if unauthorized
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            // refresh the token
            await getNewToken();

            // try again with the new token
            return paxosAxios(error.response.config);
        }

        // else pass the error through
        return error.response;
    }
);

export default paxosAxios;

export { getNewToken };