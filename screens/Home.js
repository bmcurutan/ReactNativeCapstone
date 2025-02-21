import React, { useState, useEffect } from 'react'; 
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [firstInitial, setFirstInitial] = useState(''); 
  const [lastInitial, setLastInitial] = useState(''); 

  useEffect(() => {
    const getInfo = async() => {
      const avatar = await AsyncStorage.getItem('avatar');
      setAvatar(avatar)

      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');

      setFirstInitial(firstName[0]); 
      setLastInitial(lastName[0]);
    };
  
    getInfo();
  }, []);

  const handleProfile = () => {
    console.log('Profile tapped');
    navigation.navigate('Profile');
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable 
        style={styles.avatarButtonContainer}
        onPress={handleProfile}>
        {/* {!avatar && */}
          <Text style={styles.avatarText}>{firstInitial}{lastInitial}</Text>
        {/* }
        {avatar &&
          <Image style={styles.avatarImage}
            source={{url: avatar}} />
        } */}
      </Pressable>

      <Image style={styles.logoImage}
        source={require('../assets/images/little-lemon-logo.png')} />

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Little Lemon</Text>
        <Text style={styles.subheader}>Chicago</Text>
        <Text style={styles.details}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
        
        <Image style={styles.headerImage}
          source={require('../assets/images/bruschetta.jpg')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingBottom: 44
    },
    headerContainer: {
      backgroundColor: '#3B4C45',
      padding: 16,
      marginTop: 16
    },
    header: {
      color: '#F4CE14',
      fontSize: 40
    },
    subheader: {
      color: 'white',
      fontSize: 28
    },
    details: {
      color: 'white',
      fontSize: 18,
      marginTop: 16
    },
    logoImage: {
      height: 40, 
      width: '100%', 
      resizeMode: 'contain',
      marginTop: -30
    },
    headerImage: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      marginTop: 16,
      borderRadius: 16
    },
    avatarButtonContainer: {
      marginTop: 64,
      marginLeft: 16,
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: '#3B4C45',
      justifyContent: 'center',
      alignContent: 'center'
    },
    avatarImage: {
      height: 50,
      width: 50,
      borderRadius: 25
    },
    button: {
      textAlign: 'center',
      fontSize: 18, 
      color: 'white',
      padding: 8
    },
    avatarText: {
      fontSize: 16,
      textAlign: 'center',
      color: 'white'
    }
});
