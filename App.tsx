import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigation, { navigationRef } from './src/navigation/AppStackNavigation';

function App(): React.JSX.Element {
  return (
    <>
     <NavigationContainer ref={navigationRef}>
      <AppStackNavigation/>
      </NavigationContainer>
    </>
  );
}

export default App;