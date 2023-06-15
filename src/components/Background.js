import { View, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.content}>{children}</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Background;