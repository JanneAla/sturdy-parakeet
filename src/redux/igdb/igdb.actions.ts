import axios from "axios";

const LOGIN_SUCCESS = `LOGIN_SUCCESS`
const secrets = require('../../../secrets.json');


export default login = (token) => (dispatch) => {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${secrets.ClientId}&client_secret=${secrets.ClientSecret}&grant_type=client_credentials`
    return axios.post(url)
        .then(
            (response) => {
                if (response.status === "success") {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: { token: response.token },
                    });
                    Promise.resolve();
                    return response;
                }
            },
            (error) => {
                const message = error.toString();
                Promise.reject();
                return message;
            }
        )
}