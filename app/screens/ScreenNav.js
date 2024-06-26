import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import MovieScreen from './MovieScreen';
import { NavigationContainer } from '@react-navigation/native';
import PersonScreen from './PersonScreen';

const Stack = createNativeStackNavigator();

export default function ScreenNav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Movie'
          component={MovieScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Person'
          component={PersonScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
