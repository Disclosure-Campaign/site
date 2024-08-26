import { configureStore } from '@reduxjs/toolkit';
import politiciansReducer from './features/politicians/politiciansSlice';
import authReducer from './features/auth/authSlice';

const Store = configureStore({
  reducer: {
    politicians: politiciansReducer,
    auth: authReducer,
  },
});

export default Store;