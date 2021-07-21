import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home';
import Detail from './Components/Detail';
import AddRecord from './Components/AddRecord';

const Stack = createStackNavigator();

const NavigatorComp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AddRecord" component={AddRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorComp;
