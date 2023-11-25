import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Product List Page & Pretend Backend Interaction
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderTopColor: 'green',
    borderTopWidth: 2,
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
  },
});
