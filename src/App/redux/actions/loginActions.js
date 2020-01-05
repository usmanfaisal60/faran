import axios from 'axios';
import constants from '../../../constants';

export const attemptLogin = (email, password, callbackSuccess, callbackFailure) => {
    return async dispatch => {
        try {
            const result = await axios.post(
                `${constants.base_url}/login`,
                makeFormData({ email, password }),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                    }
                }
            );

            console.log(result);
            if (result.data.success) {
                sessionStorage.setItem('auth_token', result.data.auth_token);
                callbackSuccess();
            }
        } catch (e) {
            console.log(e);
            callbackFailure();
        }
    }
}

const makeFormData = obj => {
    const toReturn = new FormData();
    for (let key in obj) {
        toReturn.append(key, obj[key]);
    }
    return toReturn;
}