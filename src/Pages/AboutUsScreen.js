import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background from "../components/Background";


const AboutUs = () => {
  const navigation = useNavigation();
  const handleReturn = () => {
    navigation.goBack();
  };
  return (
    <Background>
      <View style={styles.card}>
        <Text >Bienvenue sur l'application' de la Société Lamti De Quincaillerie (SLQ), votre expert en quincaillerie depuis plus de 30 ans. Nous sommes fiers de vous présenter notre nouvelle boutique dédiée à la vente de peinture décorative. Cette boutique est un véritable lieu de créativité et d'inspiration pour tous les amateurs de décoration et de bricolage. Nous proposons une large gamme de peintures de qualité supérieure, ainsi que tous les accessoires nécessaires pour réaliser vos projets de décoration. Chez SLQ, notre mission est de vous offrir des produits de qualité, un service personnalisé et des conseils d'experts pour vous accompagner dans tous vos projets de bricolage et de décoration. Nous sommes impatients de vous accueillir dans notre nouvelle boutique et de vous aider à concrétiser vos idées les plus créatives.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleReturn}>
              <Text style={styles.loginButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    padding: 20,
    marginVertical: 100,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  inputFocused: {
    borderColor: "black", // Couleur de la bordure lorsqu'il est cliqué
  },
  loginButton: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  linkText: {
    color: "black",
    textDecorationLine: "underline",
  },
 errorPopup: {
    
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: "red",
    padding: 10,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});
export default AboutUs;


