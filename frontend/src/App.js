import React from 'react';
import { Toaster } from "react-hot-toast";
import { router } from './routes/Routes';
import { RouterProvider } from 'react-router-dom';
import PrintSpecificComponent from './components/PrintSpecificComponent';
const App = () => (
    <>
        <RouterProvider router={router} />
        <Toaster />
        <PrintSpecificComponent />
    </>
);

export default App; 