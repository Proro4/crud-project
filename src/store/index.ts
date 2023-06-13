import {configureStore} from '@reduxjs/toolkit';
import {cardSlice} from './card/cardSlice';

const store = configureStore({
  reducer: {
    [cardSlice.reducerPath]: cardSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cardSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
