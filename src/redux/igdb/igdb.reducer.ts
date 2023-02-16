import LOGIN_SUCCESS from './igdb.actions'

const initialState = {
    isLoggedIn: false,
    token: ""
}

export default function auth(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: payload.token,
            };
        default:
            return state;
    }
}