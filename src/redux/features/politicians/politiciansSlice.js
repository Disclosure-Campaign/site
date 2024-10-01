import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import api from 'api';

var loading = {};

const requestPoliticianDetails = createAsyncThunk(
  'politicians/requestPoliticianDetails',
  async (politicianId, { getState, rejectWithValue }) => {
    var { keyedPoliticians } = getState().politicians;
    const existingData = keyedPoliticians[politicianId].dataGroups;
    const isLoading = loading[politicianId];

    var result;

    if (existingData) {
      result = existingData;
    } else if (isLoading) {
      result = rejectWithValue('Data is already being fetched.');
    } else {
      loading[politicianId] = true;

      try {
        result = await api.requestData({
          route: 'request_standard_data',
          entity_type: 'politician',
          id: politicianId
        });
      } catch (error) {
        result = rejectWithValue(error.message);
      }
    }

    return result;
  }
);

export const politiciansSlice = createSlice({
  name: 'politicians',
  initialState: {
    keyedPoliticians: {},
    sortedPoliticians: []
  },
  reducers: {
    addPoliticians: (state, action) => {
      state.keyedPoliticians = action.payload.keyedPoliticians;
      state.sortedPoliticians = action.payload.sortedPoliticians;
    },
    addPolitician: (state, action) => {
      const { politicianId, politician } = action.payload;

      state.keyedPoliticians[politicianId] = politician;
    },
    updatePolitician: (state, action) => {
      const { politicianId, politician } = action.payload;

      state.keyedPoliticians[politicianId] = _.assign(
        state.keyedPoliticians[politicianId],
        politician
      );
    }
  },
  extraReducers: builder => {
    builder
      .addCase(requestPoliticianDetails.pending, (state, action) => {
        // const politicianId = action.meta.arg;
        // state.loading[politicianId] = true;
      })
      .addCase(requestPoliticianDetails.fulfilled, (state, action) => {
        const politicianId = action.meta.arg;
        state.keyedPoliticians[politicianId].dataGroups = action.payload;
        delete loading[politicianId];
      })
      .addCase(requestPoliticianDetails.rejected, (state, action) => {
        const politicianId = action.meta.arg;
        delete loading[politicianId];
        state.error = action.payload;
      });
  }
});

export const {
  addPoliticians, addPolitician, updatePolitician,
} = politiciansSlice.actions;

export { requestPoliticianDetails };

export default politiciansSlice.reducer;