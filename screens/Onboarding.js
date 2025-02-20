import React, { useState, useEffect } from 'react'; 
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from '../utils/utils';

export default function Onboarding({ navigation }) {
  const [firstName, setFirstName] = useState(''); 
  const isFirstNameEmpty = firstName.trim() === '';

  const [email, setEmail] = useState(''); 
  const isEmailValid = email.trim() !== '' && validateEmail(email);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('loggedIn');
      if (loginStatus === 'true') {
        navigation.navigate('Profile');
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    console.log("Log in tapped")
    
    if (!isFirstNameEmpty && isEmailValid) {
      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('email', email);
      navigation.navigate('Profile');
    } 
  };

  const handleFirstName = (name) => {
    if (/^[A-Za-z’'-\s]*$/.test(name)) {
      setFirstName(name); 
    }
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.headerImage}
          source={require('../assets/images/little-lemon-logo.png')} />

      <Text style={styles.headerText}>Let us get to know you</Text>

      <Text style={styles.inputLabel}>First Name</Text>
      <TextInput style={styles.input}
        value={firstName} 
        onChangeText={handleFirstName}
      /> 

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput style={styles.input}
        value={email} 
        onChangeText={setEmail} 
        keyboardType='email-address'
        textContentType='emailAddress'
      /> 

      <Pressable
        onPress={handleLogin}
        style={[styles.buttonContainer, 
          (isFirstNameEmpty || !isEmailValid) && styles.buttonDisabled]} 
        disabled={isFirstNameEmpty || !isEmailValid}>
          <Text style={styles.button}>Log In</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headerImage: {
    height: 80, 
    width: 240, 
    resizeMode: 'contain',
    marginTop: 64
  },
  headerText: {
    padding: 48,
    fontSize: 22,
    color: '#3B4C45'
  },
  inputLabel: {
    fontSize: 22
  },
  input: { 
    height: 48, 
    width: '90%',
    margin: 16, 
    padding: 8, 
    fontSize: 18, 
    borderColor: '#3B4C45', 
    borderWidth: 1,
    borderRadius: 8
  }, 
  buttonContainer: {
    margin: 48,
    backgroundColor: '#3B4C45',
    borderRadius: 8,
    width: 100,
    height: 48
  },
  button: {
    textAlign: 'center',
    fontSize: 24, 
    color: 'white',
    padding: 8
  },
  buttonDisabled: {
    backgroundColor: 'gray'
  },
});
