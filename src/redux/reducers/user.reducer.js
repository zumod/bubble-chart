import { USER_START, USER_SUCCESS, USER_FAIL } from './../types/user.types';

let initialState =  {
    user: [], 
    error: null, 
    loading: false,
}

export const userReducer = (state= initialState, action) => {
    switch(action.type) {
        case USER_START: 
            return {...state, loading: true}
        case USER_SUCCESS:
            return {
                ...state, 
                loading: false, 
                user: action.payload,
                error: null
            }
        case USER_FAIL:
            return {
                ...state, 
                error: action.payload, 
                loading: false
            }
        default: 
            return state;            
    }
}