import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActionScreen from "./screens/ActionScreen";
import ActivityScreen from "./screens/ActivityScreen";
import DashboardScreen from "./screens/DashboardScreen";
import FormScreen from "./screens/FormScreen";
import InfoScreen from "./screens/InfoScreen";
import MapScreen from "./screens/MapScreen";
import OnboardScreen from "./screens/OnboardScreen"
import PlacesScreen from "./screens/PlacesScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faLocationDot,
  faPersonBiking,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./reducers/user";
import category from "./reducers/category";
import activities from "./reducers/activities";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({ user, category, activities });
const persistConfig = {
  key: "ecotrack",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
})
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

        return <FontAwesomeIcon icon={iconName} size={size} color={color}/>
      },
      tabBarActiveTintColor: '#41F67F',
      tabBarInactiveTintColor: '#00000033',
      tabBarStyle: { backgroundColor: '#F5F5F5' },
      headerShown: false,
    })}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{unmountOnBlur: true}} />
      <Tab.Screen name="Map" component={MapScreen} options={{unmountOnBlur: true}} />
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
            <Stack.Screen name="Onboard" component={OnboardScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Activity" component={ActivityScreen} />
            <Stack.Screen name="Action" component={ActionScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Places" component={PlacesScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
