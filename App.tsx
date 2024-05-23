import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigation, { navigationRef } from './src/navigation/AppStackNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store/index';

function App(): React.JSX.Element {
  return (
    <>
    <Provider store={store}>
     <NavigationContainer ref={navigationRef}>
      <AppStackNavigation/>
      </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;