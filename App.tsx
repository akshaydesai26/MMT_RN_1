/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
 import 'react-native-gesture-handler';
 import React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
import NavigatorComp from './NavigatorComp';
import DataProvider from './Components/DataProvider';


 const App = () => {
  return (
    <DataProvider>
      <NavigatorComp/>
    </DataProvider>
  );
};



 export default App;
