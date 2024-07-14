import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});

export default store;
