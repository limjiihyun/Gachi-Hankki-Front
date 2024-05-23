import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    characterImages: '',
  },
  reducers: {
    setCharacterImages: (state, action) => {
      state.characterImages = action.payload;
    },
  },
});

export const {setCharacterImages} = userSlice.actions;

export default userSlice.reducer;
