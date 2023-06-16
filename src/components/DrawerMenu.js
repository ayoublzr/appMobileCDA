import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuDrawer = () => {
  
    const navigation = useNavigation();

    const handleProdudt = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("Nos Produits");
  };
  const handleDevis = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("Devis");
  };
  const handleLogout = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }], 
      });
  };

  return (
    <View >
      {/* Drawer menu items */}
      <View style={styles.menuItemTitle}> 
        <Text style={styles.menuItemTitleText} >Menu</Text>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={handleProdudt}>
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

