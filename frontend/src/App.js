import React from 'react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
const App = () => (
    <div>
        <h1>User Management</h1>
        <AddUser />
        <UserList />
    </div>
);
export default App;