import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import Background from "../components/Background";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  
  useEffect(() => {
    const backAction = () => {
      if (isLoggedIn) {
        Alert.alert(
          "Notification",
          "Veuillez vous déconnecter pour revenir à la page de connexion",
          [{ text: "OK" }],
          { cancelable: true }
        );
        return true; // Prevent going back to login screen
      }
      return false; // Allow going back
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [isLoggedIn]);

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(true);
  };

  const handleCreateAccount = () => {
    navigation.navigate("register");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ChangePassWord");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios;
    axios
      .post(`${URL}/api/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        const token = JSON.stringify(response.data.token);
        SecureStore.setItemAsync("authToken", token)
          .then(() => {
            SecureStore.getItemAsync("authToken")
              .then((storedToken) => {
                setIsLoggedIn(true);
                navigation.navigate("MenuDrawer");
              })
              .catch((error) => {
                console.log(error);
                // Gérer les erreurs
              });
          })
          .catch((error) => {
            console.log(error);
            // Gérer les erreurs
          });
      })
      .catch((error) => {
        console.log(error);
        // Afficher un message d'erreur ou une notification pour l'utilisateur
        setErrorMessage("Email ou mot de passe incorrect");
      });
  };
  return (
    <Background>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </View>
        <TextInput
          style={[styles.input, emailFocused && styles.inputFocused]}
          placeholder="Adresse e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={handleEmailFocus}
          onBlur={() => setEmailFocused(false)}
        />
        <TextInput
          style={[styles.input, passwordFocused && styles.inputFocused]}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onFocus={handlePasswordFocus}
          onBlur={() => setPasswordFocused(false)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.loginButtonText}>Créer un compte</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Mot de passe oublié</Text>
          </TouchableOpacity>
        </View>
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
});

export default LoginScreen;
