import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useProductContext} from '../context/useProductContext';

const ProductList: React.FC = () => {
  const {
    searchText,
    filteredProducts,
    loading,
    products,
    handleSearch,
    handleLoadMore,
  } = useProductContext();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by product name"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.productPrice}>Price: ${item.price}</Text>
          </View>
        )}
        ListFooterComponent={
          loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : filteredProducts.length < products.length && !searchText ? (
            <TouchableOpacity onPress={handleLoadMore}>
              <Text style={styles.loadMoreButton}>Load More</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  productContainer: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadMoreButton: {
    fontSize: 16,
    color: 'blue',
    marginVertical: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  productPrice: {
    marginTop: 8,
    color: 'green',
  },
});

export default ProductList;
