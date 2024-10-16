import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import api from 'api';

var loading = {};

const requestPoliticianDetails = createAsyncThunk(
  'politicians/requestPoliticianDetails',
  async ({politicianIds, onlyBio}, { getState, rejectWithValue }) => {
    var { keyedPoliticians } = getState().politicians;
    var result;

    var ids = _.filter(politicianIds, politicianId => {
      var flag = true;

      var isLoading = loading[politicianId];
      var hasBio = onlyBio && keyedPoliticians[politicianId].dataGroups;
      var hasAllData = _.get(keyedPoliticians[politicianId].dataGroups, 'memProf');

      if (isLoading || hasBio || hasAllData) {
        flag = false;
      } else {
        loading[politicianId] = true;
      }

      return flag;
    });

    if (_.isEmpty(ids)) {
      result = rejectWithValue('Data is already present or being fetched.');
    } else {
      try {
        result = await api.requestData({
          route: 'request_standard_data',
          entity_type: 'politician',
          ids: ids.sort().join('-'),
          onlyBio
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
        const { politicianIds, onlyBio } = action.meta.arg;

        _.forEach(politicianIds, politicianId => {
          var politician = state.keyedPoliticians[politicianId];

          politician.onlyBio = onlyBio;
          politician.dataGroups = action.payload[politicianId];
          delete loading[politicianId];
        });
      })
      .addCase(requestPoliticianDetails.rejected, (state, action) => {
        const { politicianIds } = action.meta.arg;
        _.forEach(politicianIds, politicianId => delete loading[politicianId]);
        state.error = action.payload;
      });
  }
});

export const {
  addPoliticians, addPolitician, updatePolitician,
} = politiciansSlice.actions;

export { requestPoliticianDetails };

export default politiciansSlice.reducer;