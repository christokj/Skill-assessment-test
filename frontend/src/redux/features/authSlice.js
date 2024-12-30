import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [], // Initial state
    message: '',
    printAction: false,
    saveClick: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDetailData(state, action) {
            state.detailData = action.payload;
        },
        clearDetailData(state) {
            state.detailData = [];
        },
        InsertClick(state) {
            state.message = true;
        },
        UpdateClick(state) {
            state.message = false;
        },
        setPrintAction(state, action) {
            state.printAction = action.payload;
        },
        setSaveClick(state, action) {
            state.saveClick = action.payload;
        }
    }
});

export const { setDetailData, clearDetailData, InsertClick, UpdateClick, setPrintAction, setSaveClick } = authSlice.actions;

export default authSlice.reducer;
