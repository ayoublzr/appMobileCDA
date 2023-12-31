import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import ImageSwiper from "../components/ImageSwiper";

function ProductsScreen() {
  const windowWidth = Dimensions.get("window").width;
  const itemWidth = (windowWidth - 40) / 2;
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URL}/api/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${URL}/api/products/categorie/${selectedCategory}`)
        .then((res) => {
          console.log(res.data);
          setFilteredProducts(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const navigateToProductDetails = (productId) => {
    navigation.navigate("ProductDetailsScreen", { productId });
  };

  return (
    <View style={{ flex: 1 }}>
      
      <Picker 
      
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
      >
        <Picker.Item label="All Categories" value="" />
        {categories.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.id}
          />
        ))}
      </Picker>

      <ScrollView>
        <View style={styles.container}>
          {filteredProducts.length === 0 ? (
            <Text>Aucun produit trouvé !</Text>
          ) : (
            filteredProducts.map((product) => (
              <View
                key={product.id}
                style={[styles.productGroup, { width: itemWidth }]}
              >
                <TouchableWithoutFeedback onPress={() => navigateToProductDetails(product.id)}>
                  <View style={styles.productContainer}>
                    <Image
                      source={{
                        uri: URL + "/assets/uploads/" + product.image,
                      }}
                      style={styles.image}
                    />
                    <Text style={styles.productName}>
                      {product.name.toUpperCase()}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  productGroup: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  productContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  productName: {
    position: "absolute",
    bottom: 10,
    left: 10,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textTransform: "uppercase",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default ProductsScreen;
