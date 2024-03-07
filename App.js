import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import MapScreen from "./screens/MapScreen";
import ActivityScreen from "./screens/ActivityScreen";
import ActionScreen from "./screens/ActionScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import EnergyScreen from "./screens/EnergyScreen";
import FoodScreen from "./screens/FoodScreen";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import {
  faBicycle,
  faHouse,
  faLocationDot,
  faMapPin,
  faPersonBiking,
  faUserLarge,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./reducers/user";
import category from "./reducers/category";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({ user, category });
const persistConfig = {
  key: "faceup",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = faHouse;
          } else if (route.name === "Map") {
            iconName = faLocationDot;
          } else if (route.name === "Activities") {
            iconName = faPersonBiking;
          } else if (route.name === "Profile") {
            iconName = faUserLarge;
          }
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#41F67F",
        tabBarInactiveTintColor: "#00000033",
        tabBarStyle: { backgroundColor: "#F5F5F5" },
        headerShown: true,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{unmountOnBlur: true}}  />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Activities" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* navigation de dev */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Activity" component={ActivityScreen} />
            <Stack.Screen name="Action" component={ActionScreen} />
            <Stack.Screen name="Food" component={FoodScreen} />
            <Stack.Screen name="Energy" component={EnergyScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
