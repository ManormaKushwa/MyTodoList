import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import CreateTodo from './screens/create-todo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Add New Todo" component={CreateTodo} options={{
          headerTitleAlign: 'center',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
