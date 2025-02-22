import React, { useState, useEffect } from 'react'; 
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { and, or, eq, like } from 'drizzle-orm';
import * as schema from '@/db/schema';
import { menuitems } from '@/db/schema';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import Filters from '../components/Filters';
import Item from '../components/Item';
import { Searchbar } from 'react-native-paper';

export default function Home({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [firstInitial, setFirstInitial] = useState(''); 
  const [lastInitial, setLastInitial] = useState(''); 

  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const categories = ['starters', 'mains', 'desserts']; // [...new Set(data.map((item) => item.category))];
  const [filterSelections, setFilterSelections] = useState(categories.map(() => false));

  const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);

  useEffect(() => {
    const getInfo = async() => {
      const avatar = await AsyncStorage.getItem('avatar');
      setAvatar(avatar);

      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');

      setFirstInitial(firstName[0]); 
      setLastInitial(lastName === null ? '' : lastName[0]);
    };
  
    getInfo();

    const fetchData = async() => {
      console.log('fetch data');
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
        // setData(mappedData)
        return mappedData;
  
      } catch (error) {
        console.error(error);
      } 
    };

    const saveMenuItems = async(menuItems) => {
      console.log('save menu items');
      try {
        await drizzleDb.insert(menuitems).values(menuItems);
      } catch(e) {
        console.log(e);
      }
    }

    const getData = async () => {
      // console.log('get data');
      try {
        let menuItems = await drizzleDb.query.menuitems.findMany();
        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        setData(menuItems);
        setFilterSelections(categories.map(() => false));

      } catch(e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const handleProfile = () => {
    console.log('Profile tapped');
    navigation.navigate('Profile');
  };  

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    searchAndFilterData(text);
  };

  const searchAndFilterData = async(text) => {
    console.log('search and filter data');
    let selectedFilters = [];
    filterSelections.forEach((selection, index) => {
      if (selection) {
        selectedFilters.push(categories[index]);
      }
    });
    console.log(selectedFilters);
    console.log(text);

    try {
      let filteredItems = await drizzleDb.query.menuitems.findMany({
        where: and(
          or(...selectedFilters.map((category) => eq(menuitems.category, category))),
          like(menuitems.name, `%${text.toLowerCase()}%`) 
        )
      });
      console.log(filteredItems);
      setData(filteredItems);
    } catch(e) {
      console.log(e);
    }
  };

  const handleFiltersChange = async(index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    console.log(arrayCopy);
    setFilterSelections(arrayCopy);
    // console.log(filterSelections);

    filterData(arrayCopy);
  };

  const filterData = async(arrayCopy) => {
    let selectedFilters = [];
    // console.log(arrayCopy);
    arrayCopy.forEach((selection, index) => {
      // console.log(selection);
      if (selection) {
        selectedFilters.push(categories[index]);
      }
    });
    console.log(selectedFilters);

    try {
      let filteredItems = await drizzleDb.query.menuitems.findMany({
        where: or(...selectedFilters.map((category) => eq(menuitems.category, category)))
      });
      console.log(filteredItems);
      setData(filteredItems);
    } catch(e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }) => <Item name={item.name} price={item.price} description={item.description} image={item.image} category={item.category} />;

  return (
    <View style={styles.container}>
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

      <View style={[styles.headerContainer, styles.rowContainer]}>
        <View style={{ width: '70%' }}>
          <Text style={styles.header}>Little Lemon</Text>
          <Text style={styles.subheader}>Chicago</Text>
          <Text style={styles.details}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
        </View>
        
        <Image style={styles.headerImage}
          source={require('../assets/images/bruschetta.png')} />
      </View>

      <View style={{backgroundColor: '#495E57'}}>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="lightgray"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="#495E57" />
      </View>

      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        categories={categories} />

      <View style={styles.menuContainer}>
        <FlatList data={data} 
          keyExtractor={item => item.name} 
          renderItem={renderItem} 
          ListFooterComponent={<View style={{height: 48}}/>} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      backgroundColor: '#495E57',
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginTop: 16
    },
    header: {
      color: '#F4CE14',
      fontSize: 34
    },
    subheader: {
      color: 'white',
      fontSize: 22
    },
    details: {
      color: 'white',
      fontSize: 16,
      marginTop: 8
    },
    logoImage: {
      height: 40, 
      width: '100%', 
      resizeMode: 'contain',
      marginTop: -30
    },
    headerImage: {
      height: 120,
      resizeMode: 'contain',
      marginTop: 24,
      marginRight: 16
    },
    avatarButtonContainer: {
      marginTop: 64,
      marginLeft: 16,
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: '#495E57',
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
    menuContainer: {
      flex: 1,
      paddingHorizontal: 16
    },
    rowContainer: {
      width: '100%',
      flexDirection: 'row'
    },
    searchBar: {
      margin: 16,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#495E57'
    },
});
