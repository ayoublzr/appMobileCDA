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
  Button
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

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
      .post(`${URL}:3003/api/devis`, devisData)
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          {forms.map((form, index) => (
            <View key={index} style={styles.formItem}>
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
              <View style={styles.inputGroup}>
                <Text>Surface</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={form.surface}
                  onChangeText={(value) => handleSurfaceChange(value, index)}
                />
                <Text>m2</Text>
              </View>
              <View style={styles.floatingLabel}>
                <Text style={styles.label}>Comments</Text>
                <TextInput
                  style={styles.textarea}
                  multiline
                  placeholder="Leave a comment here"
                  value={form.description}
                  onChangeText={(value) =>
                    handleDescriptionChange(value, index)
                  }
                />
              </View>
              {index > 0 && (
                <Button
                  title="Supprimer"
                  onPress={() => handleRemoveForm(index)}
                />
              )}
            </View>
          ))}
          <Button
            title="Ajouter un produit"
            onPress={handleAddForm}
          />
          <View style={styles.formGroup}>
            <Text style={styles.label}>Commentaire :</Text>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={3}
              value={commentaire}
              onChangeText={handleCommentaireChange}
            />
          </View>
          <Button title="Envoyer" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  formItem: {
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  floatingLabel: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  textarea: {
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
});

export default DevisScreen;
