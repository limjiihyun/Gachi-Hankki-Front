import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../slices/user-slice';
import navigationSourceSlice from '../slices/navigation-source-slice';

export default configureStore({
  reducer: {
    user: userSlice,
    navigationSource: navigationSourceSlice,
  },
});
