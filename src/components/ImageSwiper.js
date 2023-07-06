import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";

const ImageSwiper = () => {
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);
  const { manifest } = Constants;
  const URL = manifest.extra.URL;
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && products.length > 0) {
        const currentIndex = swiperRef.current.state.index;
        const nextIndex = getRandomIndex(currentIndex, products.length);
        swiperRef.current.scrollBy(nextIndex - currentIndex, true);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [products]);

  const getRandomIndex = (currentIndex, length) => {
    let randomIndex = Math.floor(Math.random() * length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * length);
    }
    return randomIndex;
  };

  const handleImagePress = (productId) => {
    navigation.navigate("ProductDetailsScreen", { productId });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    
    <View style={{ flex: 1 }}>
    <Swiper ref={swiperRef} loop={false}>
      {products.map((product, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(product.id)}>
          <View>
          <Image source={{ uri:  URL + "/assets/uploads/" + product.image }} style={[styles.image, { width: windowWidth }]} />
          </View>
        </TouchableOpacity>
      ))}
    </Swiper>
  </View>
  );
};
const styles = StyleSheet.create({
  
  image: {
    
    height: 200,
   
  
  }
 
});
export default ImageSwiper;
