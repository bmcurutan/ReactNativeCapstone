import React, { useState, useEffect } from 'react'; 
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [firstInitial, setFirstInitial] = useState(''); 
  const [lastInitial, setLastInitial] = useState(''); 
  const [data, setData] = useState([]);

  const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

  useEffect(() => {
    const getInfo = async() => {
      const avatar = await AsyncStorage.getItem('avatar');
      setAvatar(avatar)

      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');

      setFirstInitial(firstName[0]); 
      setLastInitial(lastName === null ? '' : lastName[0]);
    };
  
    getInfo();

    const fetchData = async() => {
      try { 
        const response = await fetch(API_URL);
        const json = await response.json();
  
        const mappedData = json.menu.map(item => ({
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
          category: item.category
        }));
        // console.log(mappedData);
        setData(mappedData)
        return mappedData;
  
      } catch (error) {
        console.error(error);
      } 
    };

    fetchData();
  }, []);

  const handleProfile = () => {
    console.log('Profile tapped');
    navigation.navigate('Profile');
  };  

  const Item = ({ name, price, description, image, category }) => {
    const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`;
    // console.log(imageUrl); 
  
    return (
      <View style={styles.item}>
        <View style={styles.rowContainer}>  
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => <Item name={item.name} price={item.price} description={item.description} image={item.image} category={item.category} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable 
        style={styles.avatarButtonContainer}
        onPress={handleProfile}>
        {!avatar &&
          <Text style={styles.avatarText}>{firstInitial}{lastInitial}</Text>
        }
        {avatar &&
          <Image style={styles.avatarImage}
            source={{url: avatar}} />
        }
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

      <View style={styles.menuContainer}>
        <FlatList data={data} 
          keyExtractor={item => item.name} 
          renderItem={renderItem} />
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
      height: 160,

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
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    description: {
      fontSize: 14,
      marginVertical: 8,
      width: 280
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'gray',
      marginBottom: 16
    },
    menuContainer: {
      paddingHorizontal: 16
    },
    item: {
      borderBottomWidth: 0.5,
      borderColor: 'gray',
      paddingTop: 16
    },
    image: {
      width: 70, 
      height: 70,
      borderRadius: 8,
      marginRight: 8
    },
    rowContainer: {
      width: '100%',
      flexDirection: 'row'
    },
});
