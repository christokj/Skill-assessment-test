import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;

export const triggerAction = () => {
    return {
        type: 'TRIGGER_ACTION',
    };
};

export const printAction = () => {
    return {
        type: 'TRIGGER_ACTION',
    };
};