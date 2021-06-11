import {createSlice} from '@reduxjs/toolkit';


export const slice = createSlice({
    name: 'Auth',
    initialState: {
        user: {},
        api_token: '',
    },
    reducers: {
        auth: (state, data) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.value += 1;
            state.api_token = data.payload;
        },

        setUser: (state, data) => {
            state.user = data.payload;
        },
    },
});
export const { auth, setUser} = slice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectApiToken = state => state.api_token.value;
export const selectUser = state => state.user.value;

export default slice.reducer;
