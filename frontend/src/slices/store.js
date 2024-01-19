import { configureStore } from '@reduxjs/toolkit';
import massagesReduser from './messagesSlice';
import channelsReducer from './channelsSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    messages: massagesReduser,
    channels: channelsReducer,
    modal: modalReducer,
  },
});
