/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';
import getData from '../api/getData.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      })
      .addCase(removeChannel, (state, { payload }) => {
        const channelId = payload.id;
        const filterMessages = state.messages.filter((message) => message.channelId !== channelId);
        state.messages = filterMessages;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
