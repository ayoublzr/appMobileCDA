import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
const ProductDetailsScreen = () => {
  const [productInfo, setProductInfo] = useState(null);
  const [categorie, setCategory] = useState(null);
  const route = useRoute();
  const { productId } = route.params;
  const { manifest } = Constants;
  const URL = manifest.extra.URL;

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
  return (
    <View>
      <Text>ProductDetailsScreen</Text>
      {productInfo && (
        <View>
          <Text>Product ID: {productInfo.id}</Text>
          <Text>Product Name: {productInfo.name}</Text>
          <Text>Description: {productInfo.description}</Text>
          <Text> Catégorie: {categorie && categorie.name}</Text>

          <Image
            source={{
              uri: `${URL}/assets/uploads/` + productInfo.image,
            }}
            style={styles.image}
          />
          {/* Affichez les autres informations du produit ici */}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
});

export default ProductDetailsScreen;
