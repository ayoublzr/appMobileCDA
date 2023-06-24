import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import Background from "../components/Background";



const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${URL}/api/contact`, { name, email, message });
      console.log('Form submitted successfully:', response.data);
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
      // Display success message or perform any other actions
    } catch (error) {
      console.error('Form submission error:', error);
      // Display error message or perform any other actions
    }
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <Background>
      <View style={styles.card}>
        <Text style={[styles.Text]}>En quoi pouvons-nous vous aider</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputMessage}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Envoyer</Text>
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

  input: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  inputMessage: {
    textAlignVertical:"top",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    borderColor: "#ccc",
    borderRadius: 5,
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
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    margin:10
  },
  linkText: {
    color: "black",
    textDecorationLine: "underline",
  },
});

export default ContactUs;
