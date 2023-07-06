import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProductsScreen from "./ProductsScreen"
import DrawerMenu from '../components/DrawerMenu';
import DevisScreen from "./DevisScreen";
import ProductDetailsScreen from "./ProductDetailsScreen";
import AboutUs from "./AboutUsScreen";
import ContactUs from "./ContactUs";


const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
    return (
        <Drawer.Navigator  initialRouteName="ProductsScreen" drawerContent={() => <DrawerMenu />}>
          <Drawer.Screen style={styles.drawer} name="Nos Produits" component={ProductsScreen} />
          <Drawer.Screen style={styles.drawer} name="Devis" component={DevisScreen} />
          <Drawer.Screen style={styles.drawer} name="ProductDetailsScreen" component={ProductDetailsScreen} />
          <Drawer.Screen style={styles.drawer} name="À PROPOS" component={AboutUs} />
          <Drawer.Screen style={styles.drawer} name="Contacter nous" component={ContactUs} />
        </Drawer.Navigator>
    );
  };

  const styles = StyleSheet.create({
    drawer: {
      height:'100%',
      color: 'black',
    },
  });

  export default MenuDrawer;
