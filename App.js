import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddEventScreen from './screens/AddEventScreen';
import EventDetailScreen from './screens/EventDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Eventos Registrados' }} />
        <Stack.Screen name="AddEvent" component={AddEventScreen} options={{ title: 'Nuevo Evento' }} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Detalle del Evento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}