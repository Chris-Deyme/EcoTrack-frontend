import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import MapScreen from './screens/MapScreen';
import ActivityScreen from './screens/ActivityScreen';
import ActionScreen from './screens/ActionScreen';
import ProfilScreen from './screens/ProfilScreen'; 
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { faBicycle, faHouse, faLocationDot, faMapPin, faPersonBiking, faUserLarge, faBurger  } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

// Tentative d'import des icones globaliement
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { fab } from '@fortawesome/free-brands-svg-icons'
  import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

  library.add(fab, faCheckSquare, faCoffee)
//-------------------------------------------

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') {
          iconName = faHouse
        } else if (route.name === 'Map') {
          iconName = faLocationDot
        }else if (route.name === 'Activities') {
          iconName = faPersonBiking
        }else if (route.name === 'Profile') {
          iconName = faUserLarge
        }
        return     <FontAwesomeIcon icon={iconName} size={size} color={color}/>
      },
      tabBarActiveTintColor: '#41F67F',
      tabBarInactiveTintColor: '#00000033',
      tabBarStyle: { backgroundColor: '#F5F5F5' },
      headerShown: true,
    })}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Activities" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* navigation de dev */}
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Action" component={ActionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
  },
});
