import { Image, StyleSheet, Text, View } from 'react-native';

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

  const styles = StyleSheet.create({
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
      }
  });

  export default Item;
