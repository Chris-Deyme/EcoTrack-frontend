import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function ActionScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Activity')}>ActionScreen</Text>
    </View>
  )
}

// style={styles.container}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'green',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
});