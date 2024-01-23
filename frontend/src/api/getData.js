import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import requests from '../requests.js';

const getData = createAsyncThunk('getData', async ({ token, logOut }) => {
  try {
    const response = await axios.get(requests.getData(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      logOut();
    }
    throw Error(error);
  }
});

export default getData;
