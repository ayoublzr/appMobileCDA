import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./src/Pages/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuDrawer from "./src/Pages/MenuDrawer";
import Register from "./src/Pages/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="MenuDrawer"
          component={MenuDrawer}
          options={{ title: "MenuDrawer" }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ title: "Register" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
