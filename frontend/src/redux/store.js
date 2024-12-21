import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/userReducer';

// Redux store instance
const store = configureStore({
    reducer: {
        auth: dataReducer,
    },
});
export default store;