import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers } from '../redux/actions/userActions';
const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    useEffect(() => {
        axios.get('http://localhost:5000/api/users').then((res) => {
            dispatch(setUsers(res.data));
        });
    }, [dispatch]);
    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name} - {user.email}</li>
            ))}
        </ul>
    );
};
export default UserList;