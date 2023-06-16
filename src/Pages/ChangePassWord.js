import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Background from "../components/Background";

const ChangePassWord = () => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();
    const handleSubmit = () => {
        //TODO envoyer un email pour récupérer le mot de passe
        navigation.dispatch(navigation.navigate("login"));
    };
    return (
    <Background>
      <View style={styles.card}>

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
  });

  export default ChangePassWord;