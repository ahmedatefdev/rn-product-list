import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Products from './screens/Products';
import {ProductProvider} from './context/useProductContext';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ProductProvider>
        <Products />
      </ProductProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
