import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen'
import ActivityScreen from './screens/ActivityScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 38
   },
});
