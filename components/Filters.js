import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, categories }) => {
  return (
    <View>
      <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
      <View style={styles.filtersContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(index);
            }}
            style={{
              flex: 1 / categories.length,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
              backgroundColor: selections[index] ? '#495E57' : 'lightgray',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 8,
              margin: 4
            }}>
            <View>
              <Text style={{ 
                color: selections[index] ? 'white' : '#495E57',
                fontSize: 16,
                fontWeight: 'bold'
              }}>
                {category.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontWeight: 'bold',
    paddingTop: 16,
    paddingHorizontal: 8
  }
});

export default Filters;
