import { configureStore } from '@reduxjs/toolkit';
import politiciansReducer from './features/politicians/politiciansSlice';
import zipsReducer from './features/zips/zipsSlice';
import authReducer from './features/auth/authSlice';

const Store = configureStore({
  reducer: {
    politicians: politiciansReducer,
    zips: zipsReducer,
    auth: authReducer,
  },
});

export default Store;