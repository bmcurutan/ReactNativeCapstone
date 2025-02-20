import React, { useState, useEffect } from 'react'; 
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from '../utils/utils';

export default function Profile({ navigation }) {
    const [firstName, setFirstName] = useState(''); 
    const isFirstNameEmpty = firstName.trim() === '';

    const [lastName, setLastName] = useState(''); 

    const [email, setEmail] = useState(''); 
    const isEmailValid = email.trim() !== '' && validateEmail(email)

    const [phone, setPhone] = useState('');
    const isPhoneEmpty = phone.trim() === '';
    const isPhoneValid = phone.length === 12;

    const [isStatusesChecked, setStatuses] = useState('');
    const [isPasswordChecked, setPassword] = useState('');
    const [isOffersChecked, setOffers] = useState('');
    const [isNewsletterChecked, setNewsletter] = useState('');

    useEffect(() => {
        const getInfo = async () => {
    //       "ABC";
          const firstName = await AsyncStorage.getItem('firstName');
          console.log("TEST" + firstName);
    //       onChangeFirstName(firstName); 
        };
    
      getInfo();
    }, []);

  const handleFirstName = (name) => {
    if (/^[A-Za-z’'-\s]*$/.test(name)) {
        setFirstName(name); 
    }
  };  

  const handleLastName = (name) => {
    if (/^[A-Za-z’'-\s]*$/.test(name)) {
        setLastName(name); 
    }
  };  

  const handleLogout = async () => {
    console.log("Log out tapped");
    await AsyncStorage.removeItem('loggedIn'); 
    navigation.navigate('Onboarding');
  };

  const handleSave = async () => {
    if (!isPhoneEmpty && !isPhoneValid) {
      showAlert("Please enter a valid phone number")
    }
    // if (!isFirstNameEmpty && isEmailValid) {
    //   await AsyncStorage.setItem('loggedIn', 'true');
    //   await AsyncStorage.setItem('firstName', firstName);
    //   await AsyncStorage.setItem('email', email);
    //   onLogin(true); 
    // } 
  };

  const showAlert = (message) => {
    Alert.alert("", message, [
        {
          text: "OK", 
          onPress: () => console.log("OK Pressed")
        }
      ],
      { cancelable: true } 
    );
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.headerImage}
            source={require('../assets/images/little-lemon-logo.png')} />

        <Text style={styles.headerText}>Personal Information</Text>

        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput style={styles.input}
            value={firstName} 
            onChangeText={handleFirstName}
        /> 

        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput style={styles.input}
            value={lastName} 
            onChangeText={handleLastName}
        /> 

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input}
            value={email} 
            onChangeText={setEmail} 
            keyboardType='email-address'
            textContentType='emailAddress'
        /> 

        <Text style={styles.inputLabel}>Phone</Text>
        <TextInputMask style={styles.input}
            type={'custom'}
            options={{ mask: '999-999-9999' }}
            value={phone} 
            onChangeText={setPhone} 
        /> 

        <Text style={styles.headerText}>Email Notifications</Text>

        <View style={styles.rowContainer}>
          <CheckBox value={isStatusesChecked} onValueChange={setStatuses} />
          <Text style={styles.checkboxLabel}>Order Statuses</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox value={isPasswordChecked} onValueChange={setPassword} />
          <Text style={styles.checkboxLabel}>Password Changes</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox value={isOffersChecked} onValueChange={setOffers} />
          <Text style={styles.checkboxLabel}>Special Offers</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox value={isNewsletterChecked} onValueChange={setNewsletter} />
          <Text style={styles.checkboxLabel}>Newsletter</Text>
        </View>

        <View style={styles.rowContainer}>
          <Pressable
              onPress={handleLogout}
              style={[styles.buttonContainer]}>
              <Text style={styles.button}>Log Out</Text>
          </Pressable>

          <Pressable
              onPress={handleSave}
              style={[styles.buttonContainer, 
              (isFirstNameEmpty || !isEmailValid) && styles.buttonDisabled]} 
              disabled={isFirstNameEmpty || !isEmailValid }>
              <Text style={styles.button}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16
    },
    headerImage: {
      height: 40, 
      width: '100%', 
      resizeMode: 'contain',
      marginTop: 64
    },
    headerText: {
      paddingVertical: 16,
      fontSize: 22,
      color: '#3B4C45'
    },
    inputLabel: {
      fontSize: 16, 
      paddingTop: 8,
      paddingBottom: 4
    },
    input: { 
      height: 36, 
      width: '98%',
      marginBottom: 16, 
      padding: 8, 
      fontSize: 16, 
      borderColor: '#3B4C45', 
      borderWidth: 1,
      borderRadius: 8
    }, 
    buttonContainer: {
      marginTop: 24,
      marginRight: 16,
      backgroundColor: '#3B4C45',
      borderRadius: 8,
      width: '40%',
      height: 40
    },
    button: {
      textAlign: 'center',
      fontSize: 20, 
      color: 'white',
      padding: 8
    },
    buttonDisabled: {
      backgroundColor: 'gray',
    },
    rowContainer: {
      width: '100%',
      flexDirection: 'row', 
      alignItems: 'center',
      marginTop: -8
    },
    checkboxLabel: {
      fontSize: 16
    },
  });
  