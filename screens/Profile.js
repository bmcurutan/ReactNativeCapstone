import React, { useState, useEffect } from 'react'; 
import { Image, ScrollView, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { handleFirstNameChange, validateEmail } from "../utils/utils"

export default function Profile() {
    const [firstName, onChangeFirstName] = useState(''); 
    const isFirstNameEmpty = firstName.trim() === '';

    const [lastName, onChangeLastName] = useState(''); 
    const isLastNameEmpty = lastName.trim() === '';

    const [email, onChangeEmail] = useState(''); 
    const isEmailEmpty = email.trim() === '';
    const isEmailValid = validateEmail(email)

    const [phone, onChangePhone] = useState('');
    const isPhoneValid = phone.length === 12;

    // useEffect(() => {
    //     const getInfo = async () => {
    //       const loginStatus = await AsyncStorage.getItem('loggedIn');
    //       if (loginStatus === 'true') {
    //         onLogin(true); 
    //       }
    //     };
    
    //     checkLoginStatus();
    //   }, []);

  const handleFirstNameChange = (name) => {
    if (/^[A-Za-z’'-\s]*$/.test(name)) {
        onChangeFirstName(name); 
    }
  };  

  const handleLastNameChange = (name) => {
    if (/^[A-Za-z’'-\s]*$/.test(name)) {
        onChangeLastName(name); 
    }
  };  

  const handleSave = async () => {
    // if (!isFirstNameEmpty && isEmailValid) {
    //   await AsyncStorage.setItem('loggedIn', 'true');
    //   await AsyncStorage.setItem('firstName', firstName);
    //   await AsyncStorage.setItem('email', email);
    //   onLogin(true); 
    // } 
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.image}
            source={require('../assets/images/little-lemon-logo.png')} />

        <Text style={styles.headerText}>Personal Information</Text>

        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput style={styles.input}
            value={firstName} 
            onChangeText={handleFirstNameChange}
        /> 

        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput style={styles.input}
            value={lastName} 
            onChangeText={handleLastNameChange}
        /> 

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input}
            value={email} 
            onChangeText={onChangeEmail} 
            keyboardType='email-address'
            textContentType='emailAddress'
        /> 

        <Text style={styles.inputLabel}>Phone</Text>
        <TextInputMask style={styles.input}
            type={'custom'}
            options={{
              mask: '999-999-9999', 
            }}
            value={phone} 
            onChangeText={onChangePhone} 
        /> 

        {/* <Pressable
            onPress={handleLogin}
            style={[styles.buttonContainer, 
            (isFirstNameEmpty || !isEmailValid) && styles.buttonDisabled]} 
            disabled={isEmailEmpty}>
            <Text style={styles.button}>Next</Text>
        </Pressable> */}
      </ScrollView>
    );
  }
  
  const showAlert = (message) => {
    Alert.alert("", message, [
        {
          text: "OK", 
          onPress: () => console.log("OK Pressed")
        }
      ],
      { cancelable: true } // click outside to dismiss
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    image: {
      height: 40, 
      width: 320, 
      resizeMode: 'contain',
      marginTop: 64
    },
    headerText: {
      padding: 24,
      fontSize: 22,
      color: '#3B4C45',
    },
    inputLabel: {
      fontSize: 16, 
      paddingTop: 8
    },
    input: { 
      height: 36, 
      width: '100%',
      margin: 8, 
      padding: 8, 
      fontSize: 16, 
      borderColor: 'black', 
      borderWidth: 1,
      borderRadius: 8,
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
      padding: 8,
    },
    buttonDisabled: {
      backgroundColor: 'gray',
    },
  });
  