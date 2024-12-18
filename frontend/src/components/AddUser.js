import React, { useState } from 'react';
import axios from 'axios';
const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users', { name, email }).then(() => {
            alert('User added!');
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Add User</button>
        </form>
    );
};
export default AddUser;