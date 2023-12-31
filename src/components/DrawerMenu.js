import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from "expo-constants";
const MenuDrawer = () => {
    const { manifest } = Constants;
    const URL = manifest.extra.URL;
    const navigation = useNavigation();
    
    const handleProduct = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("Nos Produits");
  };
  const handleDevis = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("Devis");
  };
  const handleAboutUs = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("À PROPOS");
  };
  const handleContactUs = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("Contacter nous");
  };
 

  const handleLogout = async () => {
    try {
      const myToken = await SecureStore.getItemAsync('authToken');
      
    
        await axios.get(`${URL}/api/logout`,{
          headers: {
            Authorization: `Bearer ${myToken}`, // Ajoutez "Bearer " avant le token
          },
          });
          
          await SecureStore.deleteItemAsync('authToken');
          navigation.dispatch(DrawerActions.closeDrawer());
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }], 
      });
     
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la déconnexion");
    }
  };

  return (
    <View >
      
      <View style={styles.menuItemTitle}> 
        <Text style={styles.menuItemTitleText} >Menu</Text>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={handleProduct}>
        <View style={styles.menuItemContent}> 
        <Icon name="cubes" size={16} color="#333" style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>Mes Produits</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleDevis}>
      <View style={styles.menuItemContent}> 
        <Icon name="file" size={20} color="#36F" style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>Demandez un devis</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleAboutUs}>
      <View style={styles.menuItemContent}> 
        <Icon name="file" size={20} color="#36F" style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>À PROPOS</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleContactUs}>
      <View style={styles.menuItemContent}> 
        <Icon name="file" size={20} color="#36F" style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>Contacter nous</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
      <View style={styles.menuItemContent}> 
        <Icon name="sign-out" size={20} color="#F77" style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>Déconnexion</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    menuItem: {
      padding: 10,
    
    },
    menuItemText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    menuItemIcon: {
        marginRight: 10,
      },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuItemTitle: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      menuItemTitleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom : 40
      },
  });
export default MenuDrawer;

