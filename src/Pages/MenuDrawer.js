import {
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductsScreen from "./ProductsScreen"
const MenuDrawer = () => {
    const Drawer = createDrawerNavigator();
    
    return (
      <NavigationContainer independent={true}>
        <Drawer.Navigator  initialRouteName="ProductsScreen">
          <Drawer.Screen style={styles.drawer} name="Nos Produits" component={ProductsScreen} />
          {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };


  const styles = StyleSheet.create({
    drawer: {
      height: '100%',
     color:'black',
    },
  })
  export default MenuDrawer