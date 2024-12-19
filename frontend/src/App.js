import React from 'react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import { Toaster } from "react-hot-toast";
import { router } from './routes/Routes';
const App = () => (
    <>
        <h1>User Management</h1>
        <AddUser />
        <UserList />
        <RouterProvider router={router} />
        <Toaster />
    </>
);

export default App;