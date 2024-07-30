import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    characterImages: '',
    profileName: '',
    introduce: '',
  },
  reducers: {
    setCharacterImages: (state, action) => {
      state.characterImages = action.payload;
    },
    setProfileName: (state, action) => {
      state.profileName = action.payload;
    },
    setIntroduce: (state, action) => {
      state.introduce = action.payload;
    },
  },
});

export const {setCharacterImages, setProfileName, setIntroduce} =
  userSlice.actions;

export default userSlice.reducer;
