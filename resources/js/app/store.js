import { configureStore } from '@reduxjs/toolkit';
import Auth from '../features/auth/authSlice'

export default configureStore({
    reducer: {
        auth: Auth,
    },
});
