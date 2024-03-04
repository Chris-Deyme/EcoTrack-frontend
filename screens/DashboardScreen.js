import {StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>

    </View>
  )
}
// style={styles.container}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
   }
});