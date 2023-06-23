import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, SafeAreaView, StyleSheet } from 'react-native';

import LoginScreen from "./src/Pages/LoginScreen";
import MenuDrawer from "./src/Pages/MenuDrawer";
import Register from "./src/Pages/Register";
import ChangePassWord from "./src/Pages/ChangePassWord";
import PersonalInfo from "./src/Pages/PersonalInfo"
import Slide from "./src/Pages/Slide";
import AboutUs from "./src/Pages/AboutUs";
import ContactUs from "./src/Pages/ContactUs";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      {
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
              name="PersonalInfo"
              component={PersonalInfo}
              options={{ title: "PersonalInfo" }}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={{ title: "ContactUs" }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ title: "AboutUs" }}
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{ title: "Register" }}
            />
            <Stack.Screen
              name="ChangePassWord"
              component={ChangePassWord}
              options={{ title: "ChangePassWord" }}
            />
            <Stack.Screen
              name="Slide"
              component={Slide}
              options={{ title: "Slide" }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      }
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop : 42,
  },
});
