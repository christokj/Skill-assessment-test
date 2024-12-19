import React from 'react';
import { Toaster } from "react-hot-toast";
import { router } from './routes/Routes';
import { RouterProvider } from 'react-router-dom';
const App = () => (
    <>
        <RouterProvider router={router} />
        <Toaster />
    </>
);

export default App;