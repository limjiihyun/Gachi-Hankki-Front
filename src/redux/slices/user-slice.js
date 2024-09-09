import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    characterImages: '1',
    profileNickname: '',
    profileBio: '',
    department: '',
  },
  reducers: {
    setCharacterImages: (state, action) => {
      state.characterImages = action.payload;
    },
    setProfileNickname: (state, action) => {
      state.profileNickname = action.payload;
    },
    setProfileBio: (state, action) => {
      state.profileBio = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
  },
});

export const {
  setCharacterImages,
  setProfileNickname,
  setProfileBio,
  setDepartment,
} = userSlice.actions;

export default userSlice.reducer;
