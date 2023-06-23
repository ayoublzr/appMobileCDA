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
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
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

 
  const handleCreateAccount = () => {
    navigation.navigate("register");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ChangePassWord");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`${URL}/api/login`, {
        email,
        password,
      });
  
      const token = JSON.stringify(response.data.token);
  
      await SecureStore.setItemAsync("authToken", token);
  
  
      setIsLoggedIn(true);
      navigation.navigate("Slide");
    } catch (error) {
      console.log(error);
      // Gérer les erreurs
      setErrorMessage("Email ou mot de passe incorrect");
      setIsErrorPopupVisible(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFieldFocus = () => {
    setIsErrorPopupVisible(false);
  };

  return (
    <Background>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={handleFieldFocus}
          
        />
       
         <View style={styles.passwordInputContainer}>
          <TextInput
            style={{flex:1}}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            onFocus={handleFieldFocus}
            
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Ionicons
              style={styles.showPasswordIcon}
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>
{isErrorPopupVisible && (
  <View style={styles.errorPopup}>
    <Text style={styles.errorText}>{errorMessage}</Text>
  </View>
)}
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
    borderColor: "black", 
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
  passwordInputContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent:'space-between'
  },
  showPasswordIcon: {
    marginLeft: 10,
    alignItems: "flex-end",
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

export default LoginScreen;
