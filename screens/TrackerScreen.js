import { View, Text } from 'react-native'
import React from 'react'

export default function TrackerScreen() {
  return (
    <View>
      <Text>TrackerScreen</Text>
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