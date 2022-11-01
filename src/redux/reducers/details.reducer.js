import { DETAILS_START, DETAILS_SUCCESS, DETAILS_FAIL } from '../types/details.types';

let initialState =  {
    data: [], 
    error: null, 
    loading: false,
}

export const detailsReducer = (state= initialState, action) => {
    switch(action.type) {
        case DETAILS_START: 
            return {...state, loading: true}
        case DETAILS_SUCCESS:
            return {
                ...state, 
                loading: false, 
                data: action.payload,
                error: null
            }
        case DETAILS_FAIL:
            return {
                ...state, 
                error: action.payload, 
                loading: false
            }
        default: 
            return state;            
    }
}