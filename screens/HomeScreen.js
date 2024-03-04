import { View, Text } from 'react-native'
import React from 'react'

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
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