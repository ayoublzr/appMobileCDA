import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ProductsScreen from "./ProductsScreen"
import DevisScreen from "./DevisScreen";

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor:"gold",
      tabBarInactiveTintColor : "#fff",
      backgroundColor: '#000',
      tabBarStyle:{backgroundColor:"#000"}, 
      tabBarIndicatorStyle:{backgroundColor:"gold"}, 
    }}
  >
    <Tab.Screen name="Nos Produits" component={ProductsScreen} />
    <Tab.Screen name="Demandez un devis" component={DevisScreen} />
  </Tab.Navigator>
);

const TabScreen = () => {

  const navigation = useNavigation();
  
  const handlePersonalInfo = () => {
    navigation.navigate("PersonalInfo");
  };

  const handleContactUs = () => {
    navigation.navigate("ContactUs");
  };
  
  const handleAboutUs = () => {
    navigation.navigate("AboutUs");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.deconnexionicon} onPress={handlePersonalInfo}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </View>
        </TouchableOpacity>
      </View>
        <TabNavigator />
        <View style={styles.containerButtom}>
          <View >
            <TouchableOpacity onPress={handleContactUs}>
              <Text style={styles.linkText}>Conatctez-nous</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleAboutUs}>
              <Text style={styles.linkText}>A propos de nous</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButtom: {
    flex: 0.05,
    justifyContent:"center",
    alignItems:"center",
    flexDirection: "row",
    margin:10
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    
    
    
  },
  indicator: {
    backgroundColor: '#000',
  },
  linkText: {
    marginHorizontal:30,
    color: "black",
    textDecorationLine: "underline",
  },
  deconnexionicon: {
    alignItems:"center",
    
    justifyContent:"center",
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: "center",
  },

});


const Slide = () => {
  return (
    <View style={styles.container}>
      <TabScreen />
    </View>
  );
};

export default Slide;