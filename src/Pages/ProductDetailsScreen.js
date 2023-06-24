import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const ProductDetailsScreen = () => {
  const [productInfo, setProductInfo] = useState(null);
  const [categorie, setCategory] = useState(null);
  const route = useRoute();
  const { productId } = route.params;
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  const navigation = useNavigation();

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    axios
      .get(`${URL}/api/product/${productId}`)
      .then((res) => {
        setProductInfo(res.data);
        return axios.get(`${URL}/api/categorie/${res.data.CategorieId}`);
      })
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {productInfo && (
        <View style={styles.productContainer}>
          <Image
            source={{
              uri: `${URL}/assets/uploads/` + productInfo.image,
            }}
            style={[styles.image, { width: windowWidth - 40 }]}
          />
          <View style={[styles.detailsContainer, { width: windowWidth - 40 }]}>
            <Text style={styles.productName}>Nom du produit: {productInfo.name}</Text>
            <Text style={styles.category}>Catégorie: {categorie && categorie.name}</Text>
            <Text style={styles.description}>{productInfo.description}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleReturn}>
            <Text style={styles.buttonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  productContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 20,
    marginBottom: 20,
  },
  
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
