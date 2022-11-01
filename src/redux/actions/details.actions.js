import { DETAILS_START, DETAILS_SUCCESS, DETAILS_FAIL } from '../types/details.types';
import axios from 'axios';

export const fetchDetails = () => async (dispatch) => {
    dispatch(request());
    try {
        await axios.get('https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77')
            .then((res) => {
                // console.log('resultLogging', res)
                const data = res?.data; 
                data && dispatch(success(data));
            });
    } catch (err) {
        console.error('fetchDetailsError', err.message);
        dispatch(fail(err.message));
    } finally {
        console.log('API Called');
    }
};

export const request = () => {
    return {
        type: DETAILS_START,
    };
};
export const success = (DETAILS) => {
    return {
        type: DETAILS_SUCCESS,
        payload: DETAILS,
    };
};
export const fail = (data) => {
    return {
        type: DETAILS_FAIL,
        payload: data,
    };
};
