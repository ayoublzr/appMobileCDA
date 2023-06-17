import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Background from "../components/Background";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState([]);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const navigation = useNavigation();
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setEmailFocused(false);
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (errors.length === 0) {
      // Envoyer le formulaire
      axios
        .post(`${URL}/api/register`, {
          username: username,
          email: email,
          phone: phone,
          password: password,
          repeatPassword: repeatPassword,
        })
        .then((response) => {
          console.log(response.data);
          navigation.dispatch(navigation.navigate("login"));
        })
        .catch((error) => {
          console.log(error.response.data);
          // Afficher un message d'erreur ou une notification pour l'utilisateur
        });
    } else {
      // Afficher les erreurs dans la popup
      setErrors(errors);
      setIsErrorPopupVisible(true);
    }
  };
  const handleFieldFocus = () => {
    setIsErrorPopupVisible(false);
  };
  const validateForm = () => {
    const errors = [];
    if (!username.trim()) {
      errors.push("Le champ 'Nom' est obligatoire");
    }
    if (!email.trim()) {
      errors.push("Le champ 'Email' est obligatoire");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Le champ 'Email' n'est pas valide");
    }
    if (!phone.trim()) {
      errors.push("Le champ 'Numéro' est obligatoire");
    } else if (!/^\d+$/.test(phone)) {
      errors.push("Le champ 'Numéro' n'est pas valide");
    } else if (phone.length < 8) {
      errors.push("Le champ 'Numéro' doit contenir au moins 8 chiffres");
    }
    if (!password.trim()) {
      errors.push("Le champ 'Mot de passe' est obligatoire");
    } else if (password.length < 8) {
      errors.push("Le champ 'Mot de passe' doit contenir au moins 8 caractères");
    }
    if (!repeatPassword.trim()) {
      errors.push("Le champ 'Mot de passe' est obligatoire");
    } else if (repeatPassword !== password) {
      errors.push(
        "Les champs 'Mot de passe' et 'Mot de passe' doivent correspondre"
      );
    }
    return errors;
  };

  return (
    <Background>

      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </View>

        <TextInput
          style={[styles.input, emailFocused && styles.inputFocused]}
          placeholder="Nom"
          value={username}
          onChangeText={setUsername}
          
          onBlur={() => setEmailFocused(false)}
          onFocus={handleFieldFocus}
        />

        <TextInput
          style={[styles.input, emailFocused && styles.inputFocused]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onFocus={handleFieldFocus}
          onBlur={() => setEmailFocused(false)}
        />
        <TextInput
          style={[styles.input, phoneFocused && styles.inputFocused]}
          placeholder="Numéro"
          value={phone}
          onChangeText={setPhone}
          onFocus={handleFieldFocus}
          onBlur={() => setPhoneFocused(false)}
        />

        <TextInput
          style={[styles.input, passwordFocused && styles.inputFocused]}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onFocus={handleFieldFocus}
        />
        <TextInput
          style={[styles.input, passwordFocused && styles.inputFocused]}
          placeholder="Confirmer Mot de passe"
          secureTextEntry={true}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          onFocus={handleFieldFocus}
          onBlur={() => setPasswordFocused(false)}
        />
 
 {isErrorPopupVisible && (
  <View style={styles.errorPopup}>
    <Text style={styles.errorText}>Une erreur s'est produite. Veuillez vérifier les champs.</Text>
  </View>
)}
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Créer un compte</Text>
        </TouchableOpacity>
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

export default Register;
