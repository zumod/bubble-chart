import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/actions/user.actions';

const Chart = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user);

    useEffect(() => {
        // to dispatch API
        dispatch(fetchUser())
    }, [dispatch]);

    useEffect(() => {
        console.log('userDataTesting', user)
    }, [user]);

    return <>Hello</>;
};

export default Chart;
