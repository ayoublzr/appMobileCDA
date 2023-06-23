import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Background from "../components/Background";
import Constants from "expo-constants";
import axios from "axios";
const ChangePassWord = () => {
    const [email, setEmail] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const navigation = useNavigation();
    const { manifest } = Constants;
    
  const URL = manifest.extra.URL;
    const handleSubmit = (event) => {
      event.preventDefault();
  
      axios
        .post(`${URL}/api/resetpassword/`, {
          email: email,
        })
        .then((response) => {
          console.log(response.data);
          setShowMessage(true); // Afficher le message avant la navigation
  
          setTimeout(() => {
            setShowMessage(false); // Masquer le message après 3 secondes
            navigation.dispatch(navigation.navigate("login")) // Naviguer vers la page de connexion
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    return (
    <Background>
      <View style={styles.card}>
      {showMessage && (
  <View style={[styles.popup]}>
    <Text  style={[styles.message]}>Veuillez vérifier votre adresse e-mail pour modifier votre mot de passe.</Text>
  </View>
)}
        <Text style={styles.Text}>Récupérer mon mot de passe </Text>
        <TextInput
          style={[styles.input]}
          placeholder="Veuillez saisir votre adresse e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={()=>{navigation.navigate("login")}}>
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

    Text: {
      color: "gold",
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "bold",

    },
    popup: {
    
      top: 0,
      left: 0,
      right: 0,
      borderRadius: 20,
      backgroundColor: "green",
      padding: 10,
    },
    message: {
      color: "white",
      textAlign: "center",
    },
  });

  export default ChangePassWord;