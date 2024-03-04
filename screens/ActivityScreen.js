import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text>ActivityScreen</Text>
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