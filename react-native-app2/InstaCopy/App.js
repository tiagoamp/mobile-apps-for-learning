import 'react-native-gesture-handler';
import React, {Fragment, useState} from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './src/Views/Feed/Feed';
import Login from './src/Views/Login/Login';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} 
                  options={{
                    title: 'Login do App',
                    headerStyle: {
                      backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                   }} />
        <Stack.Screen name="Feed" component={Feed} 
                  options={{
                    title: 'Feed do App',
                    headerStyle: {
                      backgroundColor: 'green',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;
