import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image , StyleSheet, SafeAreaView} from 'react-native';


const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 2000); // 2 seconds in milliseconds
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../assets/SLQ.gif')}
            style={styles.image}
            resizeMode="contain"
         />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black'
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'black'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '120%',
      },
  });
export default SplashScreen;