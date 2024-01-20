import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import requests from '../requests.js';

const getData = createAsyncThunk('getData', async (token, logOut, t) => {
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
      toast.error(`${t('PopUpAlerts.mainPage')}`, {
        icon: '😿',
      });
    }
    throw Error(error);
  }
});

export default getData;
