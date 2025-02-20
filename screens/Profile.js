import React, { useState, useEffect } from 'react'; 
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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
    const isPhoneValid = phone === null || phone.length === 12;

    const [isStatusesChecked, setStatuses] = useState(false);
    const [isPasswordChecked, setPassword] = useState(false);
    const [isOffersChecked, setOffers] = useState(false);
    const [isNewsletterChecked, setNewsletter] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
          const firstName = await AsyncStorage.getItem('firstName');
          const lastName = await AsyncStorage.getItem('lastName');
          const email = await AsyncStorage.getItem('email');
          const phone = await AsyncStorage.getItem('phone');

          setFirstName(firstName); 
          setLastName(lastName);
          setEmail(email);
          setPhone(phone);

          const statuses = await AsyncStorage.getItem('statuses');
          const password = await AsyncStorage.getItem('password');
          const offers = await AsyncStorage.getItem('offers');
          const newsletter = await AsyncStorage.getItem('newsletter');

          setStatuses(statuses === 'true' ? true : false);
          setPassword(password === 'true' ? true : false);
          setOffers(offers === 'true' ? true : false);
          setNewsletter(newsletter === 'true' ? true : false);
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
    console.log("Save tapped");

    if (!isPhoneValid) {
      showAlert("Please enter a valid phone number or clear the input field")

    } else {
      showAlert("Profile saved")

      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phone', phone);

      await AsyncStorage.setItem('statuses', isStatusesChecked ? 'true' : 'false');
      await AsyncStorage.setItem('password', isPasswordChecked ? 'true' : 'false');
      await AsyncStorage.setItem('offers', isOffersChecked ? 'true' : 'false');
      await AsyncStorage.setItem('newsletter', isNewsletterChecked ? 'true' : 'false');
    }
  };

  const showAlert = (message) => {
    Alert.alert("", message, [
        {
          text: "OK", 
          onPress: () => console.log("OK tapped")
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
            keyboardType='phone-pad'
        /> 

        <Text style={styles.headerText}>Email Notifications</Text>

        <View style={styles.rowContainer}>
          <CheckBox checkedColor="#3B4C45"
            checked={isStatusesChecked} 
            onPress={() => setStatuses(!isStatusesChecked)} />
          <Text style={styles.checkboxLabel}>Order Statuses</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox checkedColor="#3B4C45"
            checked={isPasswordChecked} 
            onPress={() => setPassword(!isPasswordChecked)} />
          <Text style={styles.checkboxLabel}>Password Changes</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox checkedColor="#3B4C45"
            checked={isOffersChecked}
            onPress={() => setOffers(!isOffersChecked)} />
          <Text style={styles.checkboxLabel}>Special Offers</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox checkedColor="#3B4C45"
            checked={isNewsletterChecked}
            onPress={() => setNewsletter(!isNewsletterChecked)} />
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
  