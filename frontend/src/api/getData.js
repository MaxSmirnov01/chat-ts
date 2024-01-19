import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import requests from '../requests.js';

const getData = createAsyncThunk('getData', async (token) => {
  const response = await axios.get(requests.getData(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export default getData;
