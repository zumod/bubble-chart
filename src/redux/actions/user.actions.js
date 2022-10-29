import { USER_START, USER_SUCCESS, USER_FAIL } from './../types/user.types';
import axios from 'axios';

export const fetchUser = () => async (dispatch) => {
    dispatch(request());
    try {
        await axios.get('https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77')
            .then((res) => {
                // console.log('resultLogging', res)
                const data = res?.data;
                data && dispatch(success(data));
            });
    } catch (err) {
        console.error('fetchUserError', err.message);
        dispatch(fail(err.message));
    } finally {
        console.log('API Called');
    }
};

export const request = () => {
    return {
        type: USER_START,
    };
};
export const success = (user) => {
    return {
        type: USER_SUCCESS,
        payload: user,
    };
};
export const fail = (data) => {
    return {
        type: USER_FAIL,
        payload: data,
    };
};
