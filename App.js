import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Restaurant, OrderDelivery} from './screens';
import Tabs from './navigation/Tabs';

const stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <stack.Screen name="Home" component={Tabs}></stack.Screen>
        <stack.Screen name="Restaurant" component={Restaurant}></stack.Screen>
        <stack.Screen
          name="OrderDelivery"
          component={OrderDelivery}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
