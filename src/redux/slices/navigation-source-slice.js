import {createSlice} from '@reduxjs/toolkit';

const navigationSourceSlice = createSlice({
  name: 'navigation',
  initialState: {
    profileSettingNavigation: false,
  },
  reducers: {
    setProfileSettingNavigation: (state, action) => {
      state.profileSettingNavigation = action.payload;
    },
  },
});

export const {setProfileSettingNavigation} = navigationSourceSlice.actions;

export default navigationSourceSlice.reducer;
