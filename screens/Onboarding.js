import React, { useState } from 'react'; 
import { Image, ScrollView, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';

export default function Onboarding() {
  const [firstName, onChangeFirstName] = useState(''); 
  const isFirstNameEmpty = firstName.trim() === '';
  const [email, onChangeEmail] = useState(''); 
  const isEmailEmpty = email.trim() === '';
  const isEmailValid = validateEmail(email)

  const handleFirstNameChange = (name) => {
    if (/^[A-Za-z’'-\s]*$/.test(name)) {
      onChangeFirstName(name); 
    }
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image}
          source={require('../assets/images/little-lemon-logo.png')} />

      <Text style={styles.headerText}>Let us get to know you</Text>

      <Text style={styles.inputLabel}>First Name</Text>
      <TextInput style={styles.input}
        value={firstName} 
        onChangeText={handleFirstNameChange}
      /> 

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput style={styles.input}
        value={email} 
        onChangeText={onChangeEmail} 
        keyboardType='email-address'
        textContentType='emailAddress'
      /> 

      <Pressable
        onPress={() => {
          if (!isFirstNameEmpty && isEmailValid) {
            // TODO
          } 
        }}
        style={[styles.buttonContainer, 
          (isFirstNameEmpty || !isEmailValid) && styles.buttonDisabled]} 
        disabled={isEmailEmpty}>
          <Text style={styles.button}>Next</Text>
      </Pressable>
    </ScrollView>
  );
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

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
    height: 80, 
    width: 240, 
    resizeMode: 'contain',
  },
  headerText: {
    padding: 48,
    fontSize: 22,
    color: '#3B4C45'
  },
  inputLabel: {
    fontSize: 24
  },
  input: { 
    height: 48, 
    width: '80%',
    margin: 16, 
    padding: 8, 
    fontSize: 18, 
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
