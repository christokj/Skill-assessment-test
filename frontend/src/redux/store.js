import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

// Redux store instance
export const store = configureStore({
    reducer: {
        auth: userReducer,
    },
});
export default store;