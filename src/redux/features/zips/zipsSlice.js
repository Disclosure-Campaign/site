import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

export const zipsSlice = createSlice({
  name: 'zips',
  initialState: {
    keyedZips: {},
    zipList: []
  },
  reducers: {
    addZips: (state, action) => {
      state.keyedZips = action.payload.keyedZips;
      state.zipList = action.payload.zipList;
    },
    addZip: (state, action) => {
      const { zipId, zip } = action.payload;

      state.keyedZips[zipId] = zip;
    },
    updateZip: (state, action) => {
      const { zipId, zip } = action.payload;

      state.keyedZips[zipId] = _.assign(
        state.keyedZips[zipId],
        zip
      );
    }
  }
});

export const {
  addZips, addZip, updateZip
} = zipsSlice.actions;

export default zipsSlice.reducer;