/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import LibraryStack from 'navigators/LibraryStack';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import IgdbApiProvider from 'contexts/IGDBAuth';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IgdbApiProvider>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <LibraryStack />
        </IgdbApiProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
