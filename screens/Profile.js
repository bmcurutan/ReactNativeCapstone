import React, { useState, useEffect } from 'react'; 
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { validateEmail } from '../utils/utils';

export default function Profile({ navigation }) {
  const [avatar, setAvatar] = useState(null);

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
      const getInfo = async() => {
        const avatar = await AsyncStorage.getItem('avatar');
        setAvatar(avatar)

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

        setStatuses(statuses === 'true');
        setPassword(password === 'true');
        setOffers(offers === 'true');
        setNewsletter(newsletter === 'true');
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

  const handleLogout = async() => {
    console.log('Log out tapped');

    showAlert(
      'Are you sure you want to log out?',
      async() => {
        await AsyncStorage.removeItem('loggedIn'); 
        await AsyncStorage.removeItem('avatar'); 

        await AsyncStorage.removeItem('firstName'); 
        await AsyncStorage.removeItem('lastName'); 
        await AsyncStorage.removeItem('email'); 
        await AsyncStorage.removeItem('phone'); 

        await AsyncStorage.removeItem('statuses'); 
        await AsyncStorage.removeItem('password'); 
        await AsyncStorage.removeItem('offers'); 
        await AsyncStorage.removeItem('newsletter'); 

        navigation.navigate('Onboarding');
      },
      () => {}
    );
  };

  const handleUpdateAvatar = async() => {
    console.log('Update tapped');

    showAlert(
      'Are you sure you want to update your avatar?',
      async() => {
        pickImage()
      },
      () => {}
    );
  };

  const handleRemoveAvatar = async() => {
    console.log('Remove tapped');

    showAlert(
      'Are you sure you want to remove your avatar?',
      async() => {
        await AsyncStorage.removeItem('avatar'); 
        setAvatar(null);
      },
      () => {}
    );
  };

  const handleBack = () => {
    console.log('Back tapped');

    navigation.pop();
  };

  const handleSave = async() => {
    console.log('Save tapped');

    if (!isPhoneValid) {
      showAlert('Please enter a valid phone number or clear the input field');

    } else {
      showAlert('Profile saved');
      navigation.pop()

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

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setAvatar(uri);
      await AsyncStorage.setItem('avatar', uri);
    }
  };

  const showAlert = (message, onAffirmative, onNegative) => {
    var buttons = []

    if (onAffirmative != null) {
      buttons.push(
        {
          text: 'Yes', 
          onPress: () => {
            if (onAffirmative) {
              onAffirmative();
            } else {
              console.log('Yes tapped'); 
            }
          },
        });
    }

    if (onNegative != null) {
      buttons.push(
      {
        text: 'No',
        onPress: () => {
          if (onNegative) {
            onNegative();
          } else {
            console.log('No tapped'); 
          }
        },
      });
    }

    if (onNegative === null && onAffirmative === null) {
      buttons.push(
        {
          text: "OK", 
          onPress: () => console.log("OK Pressed")
        });
    }

    Alert.alert(
      '',
      message,
      buttons,
      { cancelable: true }
    );
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable
            onPress={handleBack}
            style={styles.backButtonContainer}>
            <Text style={styles.button}>←</Text>
        </Pressable>

        <Image style={styles.headerImage}
            source={require('../assets/images/little-lemon-logo.png')} />

        <Text style={styles.headerText}>Personal Information</Text>

        <Text style={styles.inputLabel}>Avatar</Text>
        <View style={styles.rowContainer}>  
          <View style={styles.avatarContainer}>
          {!avatar &&
            <Text style={styles.avatarText}>{firstName[0]}{lastName === null ? '' : lastName[0]}</Text>
          }
          {avatar &&
            <Image style={styles.avatarImage}
              source={{url: avatar}} />
          }
          </View>
          <Pressable
              onPress={handleUpdateAvatar}
              style={styles.buttonContainer}>
              <Text style={styles.button}>Update</Text>
          </Pressable>
          {avatar && <Pressable
              onPress={handleRemoveAvatar}
              style={[styles.buttonContainer, styles.secondaryContainer]}>
              <Text style={[styles.button, styles.secondaryButton]}>Remove</Text>
          </Pressable>}
        </View>

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
          <CheckBox checkedColor='#495E57'
            checked={isStatusesChecked} 
            onPress={() => setStatuses(!isStatusesChecked)} />
          <Text style={styles.checkboxLabel}>Order Statuses</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox checkedColor='#495E57'
            checked={isPasswordChecked} 
            onPress={() => setPassword(!isPasswordChecked)} />
          <Text style={styles.checkboxLabel}>Password Changes</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox checkedColor='#495E57'
            checked={isOffersChecked}
            onPress={() => setOffers(!isOffersChecked)} />
          <Text style={styles.checkboxLabel}>Special Offers</Text>
        </View>

        <View style={styles.rowContainer}>
          <CheckBox checkedColor='#495E57'
            checked={isNewsletterChecked}
            onPress={() => setNewsletter(!isNewsletterChecked)} />
          <Text style={styles.checkboxLabel}>Newsletter</Text>
        </View>

        <View style={styles.rowContainer}>
          <Pressable
              onPress={handleLogout}
              style={[styles.buttonContainer, styles.logoutButtonContainer]}>
              <Text style={[styles.button, styles.logoutButton]}>Log Out</Text>
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
      marginHorizontal: 16,
      paddingBottom: 44
    },
    avatarContainer: {
      backgroundColor: 'gray',
      height: 80, 
      width: 80,
      justifyContent: 'center',
      borderRadius: 40,
      marginVertical: 16,
      marginRight: 16
    },
    avatarText: {
      fontSize: 36,
      textAlign: 'center',
      color: 'white'
    },
    avatarImage: {
      height: 80,
      width: 80,
      borderRadius: 40
    },
    headerImage: {
      height: 40, 
      width: '100%', 
      resizeMode: 'contain',
      marginTop: -30
    },
    headerText: {
      paddingVertical: 16,
      fontSize: 22,
      color: '#495E57'
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
      borderColor: '#495E57', 
      borderWidth: 1,
      borderRadius: 8
    }, 
    buttonContainer: {
      marginTop: 24,
      marginRight: 16,
      backgroundColor: '#495E57',
      borderRadius: 8,
      width: '30%',
      height: 40,
      justifyContent: 'center'
    },
    secondaryContainer: {
      backgroundColor: 'white',
      borderColor: '#495E57',
      borderWidth: 1,
      borderRadius: 8,
    },
    backButtonContainer: {
      marginTop: 64,
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: '#495E57',
      justifyContent: 'center',
      alignContent: 'center'
    },
    logoutButtonContainer: {
      backgroundColor: '#F4CE14'
    },
    button: {
      textAlign: 'center',
      fontSize: 18, 
      color: 'white',
      padding: 8
    },
    secondaryButton: {
      color: '#495E57',
      padding: 8
    },
    logoutButton: {
      color: 'black'
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
  