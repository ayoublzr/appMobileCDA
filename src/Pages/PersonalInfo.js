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

const PersonalInfo = () => {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const navigation = useNavigation();
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  
  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const handleSignOut =  async () => {
      /*  try {
          const myToken = await SecureStore.getItemAsync('authToken');
          
          await SecureStore.deleteItemAsync('authToken');
        
            await axios.get(`${URL}/api/logout`,{
                headers: {
                    Authorization: myToken,
                  },
              });
      */
            navigation.reset({
                index: 0,
                routes: [{ name: 'login' }], 
          });
         
       /* } catch (error) {
          console.log(error);
          alert("Erreur lors de la déconnexion");
        }*/
      };
  
  return (
    <Background>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </View>
        <Text style={styles.loginButtonText}>Identifiant</Text>
        <TextInput
          style={[styles.input, emailFocused && styles.inputFocused]}
          placeholder="Adresse e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={handleEmailFocus}
          onBlur={() => setEmailFocused(false)}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignOut}
        >
          <Text style={styles.loginButtonText}>Déconnexion</Text>
        </TouchableOpacity>

      </View>
    </Background>
  );
};

export default PersonalInfo;
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

