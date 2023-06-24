import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import Constants from "expo-constants";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/FontAwesome';

function DevisScreen() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [id, setId] = useState();
  const [commentaire, setCommentaire] = useState("");
  const [forms, setForms] = useState([
    { categorie: "", product: "", surface: "", description: "" },
  ]);
  const [token, setToken] = useState("");
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  useEffect(() => {
    axios
      .get(`${URL}/api/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    forms.forEach((form, index) => {
      if (form.categorie) {
        axios
          .get(`${URL}/api/products/categorie/${form.categorie}`)
          .then((res) => {
            const updatedProduits = [...produits];
            updatedProduits[index] = res.data;
            setProduits(updatedProduits);
          })
          .catch((err) => console.log(err));
      }
    });
  }, [forms]);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync("authToken");
      console.log(storedToken);
      if (storedToken) {
        setToken(storedToken);
        const decodedToken = jwtDecode(storedToken);
        setId(decodedToken.id);
      }
    
    };
  
    fetchToken();
  }, [])

  const handleCommentaireChange = (value) => {
    setCommentaire(value);
  };

  const handleCategoryChange = (value, index) => {
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, categorie: value, product: "" } : form
      )
    );
  };

  const handleProductChange = (value, index) => {
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, product: value } : form
      )
    );
  };

  const handleSurfaceChange = (value, index) => {
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, surface: value } : form
      )
    );
  };

  const handleDescriptionChange = (value, index) => {
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, description: value } : form
      )
    );
  };

  const handleAddForm = () => {
    setForms((prevForms) => [
      ...prevForms,
      { categorie: "", product: "", surface: "", description: "" },
    ]);
  };

  const handleRemoveForm = (index) => {
    setForms((prevForms) => prevForms.filter((form, i) => i !== index));
  };

  const handleSubmit = () => {
    const devisData = {
      UserId: id,
      commentaire: commentaire,
      token: token,
    };
    

    // Envoyer la requête pour créer le devis
    axios
      .post(`${URL}/api/devis`, devisData)
      .then((res) => {
        const devisId = res.data.id; // Récupérer l'ID du devis créé

        const sendEmailToAdmin = (DeviId) => {
          const devisData = {
            UserId: id,
            token: token,
            DeviId: DeviId,
          };

          axios
            .post(`${URL}/api/sendDevis`, devisData)
            .then((res) => {
              console.log("E-mail sent successfully!");
            })
            .catch((error) => {
              console.log("Error sending e-mail:", error);
            });
        };

        // Créer les devisDetails pour chaque produit dans le formulaire
        const requests = forms.map((form) => {
          const devisDetailsData = {
            surface: form.surface,
            detail: form.description,
            DeviId: devisId,
            ProductId: form.product,
          };
          console.log(devisDetailsData);

          // Retourner la promesse pour chaque requête de création de devisDetails
          return axios.post(
            `${URL}/api/devis-details`,
            devisDetailsData
          );
        });

        // Exécuter toutes les requêtes de création de devisDetails en parallèle
        return Promise.all(requests)
          .then(() => {
            // Réinitialiser le formulaire après la création du devis
            setForms([
              { categorie: "", product: "", surface: "", description: "" },
            ]);
            // Autres actions de réussite (affichage d'un message, redirection, etc.)
            sendEmailToAdmin(devisId);
          })
          .catch((error) => {
            console.log(error);
            // Gérer les erreurs (affichage d'un message, etc.)
          });
      })
      .catch((error) => {
        console.log(error);
        // Gérer les erreurs (affichage d'un message, etc.)
      });
  };

  return (
    <View>
  <ScrollView>
    <View style={styles.formContainer}>
      {forms.map((form, index) => (
        <View key={index}>
          <View style={styles.inputGroup}>
            {index >= 0 && (
              <Text style={styles.textProduit}>Produit n° {index + 1}</Text>
            )}
          </View>
          <View>
            <Picker
              selectedValue={form.categorie}
              onValueChange={(value) => handleCategoryChange(value, index)}
            >
              <Picker.Item label="Catégorie" value="" enabled={false} />
              {categories.map((categorie) => (
                <Picker.Item
                  key={categorie.id}
                  label={categorie.name}
                  value={categorie.id}
                />
              ))}
            </Picker>
          </View>
          <View>
            <Picker
              selectedValue={form.product}
              onValueChange={(value) => handleProductChange(value, index)}
            >
              <Picker.Item label="Produit" value="" enabled={false} />
              {produits[index]?.map((produit) => (
                <Picker.Item
                  key={produit.id}
                  label={produit.name}
                  value={produit.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Surface:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.surface}
              onChangeText={(value) => handleSurfaceChange(value, index)}
            />
            <Text style={styles.text}>m²</Text>
          </View>
          <View>
            <Text style={styles.text}>Détails:</Text>
            <TextInput
              style={styles.inputLarge}
              multiline
              numberOfLines={3}
              placeholder="Ajoutez plus de détails"
              value={form.description}
              onChangeText={(value) => handleDescriptionChange(value, index)}
            />
          </View>
          {forms.length === 1 ? (
            <View>
              <TouchableOpacity style={index === 0 ? styles.buttonPerso : styles.button} onPress={handleAddForm}>
                <Text style={styles.buttonText}>Ajouter un produit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <View>
                <TouchableOpacity style={index === 0 ? styles.buttonPerso : styles.button} onPress={handleAddForm}>
                  <Text style={styles.buttonText}>Ajouter un produit</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.buttonDelete} onPress={() => handleRemoveForm(index)}>
                  <Text style={styles.buttonText}>Supprimer ce produit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}
      <View>
        <Text style={styles.text}>Commentaire:</Text>
        <TextInput
          style={styles.inputLarge}
          multiline
          numberOfLines={3}
          value={commentaire}
          placeholder="Ajoutez un commentaire"
          onChangeText={handleCommentaireChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPerso} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
</View>

 );
}

const styles = StyleSheet.create({
  formContainer: {
    flex:1,
    alignItems: "stretch",
  },
  inputGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingStart:5
  },
  inputLarge: { 
    textAlignVertical:"top",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    margin:10,
    padding:5,

  },
  text: {
    margin: 10
  },
  textProduit: {
    fontSize:15,
    fontWeight: "bold",
    color:"#000",
    margin: 10
  },
  button: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
    margin:10,
  },
  buttonPerso: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
    margin:10,
    width:"96%"
  },
  buttonDelete: {
    backgroundColor: "#B40404",
    borderRadius: 5,
    padding: 10,
    margin:10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer:{
    flex:1,
    justifyContent: 'space-evenly',
    //alignItems: 'center',
    flexDirection: "row",

  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    color: "black",
    textDecorationLine: "underline",
  },


});

export default DevisScreen;
