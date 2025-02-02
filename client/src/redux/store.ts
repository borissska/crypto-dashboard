import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import user from './slices/userSlice';
import data from './slices/dataSlice';
import manyData from './slices/manyDataSlice';
import { configureStore } from '@reduxjs/toolkit';
import portfolioData from './slices/portfolioDataSlice';

export const store = configureStore({
  reducer: {
    user,
    data,
    manyData,
    portfolioData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
