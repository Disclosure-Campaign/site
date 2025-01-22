import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import api from 'api';

const requestPoliticianDetails = createAsyncThunk(
  'politicians/requestPoliticianDetails',
  async ({politicianIds, dataGroup}, {getState, rejectWithValue}) => {
    // var { keyedPoliticians } = getState().politicians;
    var result;

    // ruins back button because of bizarre redux update timing issue
    // var ids = _.filter(politicianIds, politicianId => (
    //   !keyedPoliticians[politicianId][dataGroup]
    // ));

    var ids = politicianIds;

    if (_.isEmpty(ids)) {
      result = rejectWithValue('Data is already present or being fetched.');
    } else {
      try {
        result = await api.requestData({
          route: 'request_standard_data',
          entity_type: 'politician',
          ids: ids.sort().join('-'),
          dataGroup
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
    sortedPoliticians: [],
    id: null
  },
  reducers: {
    addPoliticians: (state, action) => {
      if (_.isEmpty(state.keyedPoliticians)) {
        state.keyedPoliticians = action.payload.keyedPoliticians;
      }

      if (_.isEmpty(state.sortedPoliticians)) {
        state.sortedPoliticians = action.payload.sortedPoliticians;
      }
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
        // setTimeout(() => {
        //   const { politicianIds, dataGroup } = action.meta.arg;

        //   _.forEach(politicianIds, politicianId => {
        //     state.keyedPoliticians[politicianId][dataGroup] = 'pending';
        //   });
        // });
      })
      .addCase(requestPoliticianDetails.fulfilled, (state, action) => {
        const { politicianIds, onlyBio } = action.meta.arg;

        _.forEach(politicianIds, politicianId => {
          _.forEach(action.payload[politicianId], (value, key) => {
            if (value) state.keyedPoliticians[politicianId][key] = value;
          });

          state.keyedPoliticians[politicianId].onlyBio = onlyBio;
        });

        state.id = _.uniqueId();
      })
      .addCase(requestPoliticianDetails.rejected, (state, action) => {
        const { politicianIds, dataGroup } = action.meta.arg;

        _.forEach(politicianIds, politicianId => {
          delete state.keyedPoliticians[politicianId][dataGroup];
        });

        state.error = action.payload;
      });
  }
});

export const {
  addPoliticians, addPolitician, updatePolitician,
} = politiciansSlice.actions;

export { requestPoliticianDetails };

export default politiciansSlice.reducer;