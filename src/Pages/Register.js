import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import Background from "../components/Background";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import '../components/global'

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
  const navigation = useNavigation();

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
      axios
        .post("http://"+global.myIpAdress+":"+global.myPort+"/api/register", {
          username: username,
          email: email,
          phone: phone,
          password: password,
          repeatPassword: repeatPassword,
        })
        .then((response) => {
          console.log(response.data);
          navigation.dispatch(navigation.navigate("login"))
        })
        .catch((error) => {
          console.log(error.response.data);
          // Afficher un message d'erreur ou une notification pour l'utilisateur
        });
    } else {
      setErrors(errors);
    }
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
      errors.push("Le champ 'Phone' est obligatoire");
    } else if (!/^\d+$/.test(phone)) {
      errors.push("Le champ 'Phone' n'est pas valide");
    }
    if (!password.trim()) {
      errors.push("Le champ 'Password' est obligatoire");
    } else if (password.length < 8) {
      errors.push("Le champ 'Password' doit contenir au moins 8 caractères");
    }
    if (!repeatPassword.trim()) {
      errors.push("Le champ 'Repeat password' est obligatoire");
    } else if (repeatPassword !== password) {
      errors.push(
        "Les champs 'Password' et 'Repeat password' doivent correspondre"
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
          onFocus={() => setEmailFocused(false)}
          onBlur={() => setEmailFocused(false)}
        />

        <TextInput
          style={[styles.input, emailFocused && styles.inputFocused]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />
        <TextInput
          style={[styles.input, phoneFocused && styles.inputFocused]}
          placeholder="Numéro"
          value={phone}
          onChangeText={setPhone}
          onFocus={() => setPhoneFocused(true)}
          onBlur={() => setPhoneFocused(false)}
        />

        <TextInput
          style={[styles.input, passwordFocused && styles.inputFocused]}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          
        />
        <TextInput
          style={[styles.input, passwordFocused && styles.inputFocused]}
          placeholder="Confirmer Mot de passe"
          secureTextEntry={true}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          onFocus={handlePasswordFocus}
          onBlur={() => setPasswordFocused(false)}
        />
          {errors.includes("Le champ 'Email' est obligatoire") && (
            <Alert variant="danger">Le champ 'Email' est obligatoire</Alert>
          )}
          {errors.includes("Le champ 'Email' n'est pas valide") && (
            <Alert variant="danger">Le champ 'Email' n'est pas valide</Alert>
          )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit}
        >
          <Text style={styles.loginButtonText}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleReturn}
        >
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
});

export default Register;
