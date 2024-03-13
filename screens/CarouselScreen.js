import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function CarouselScreen() {
  return (
    <View style={styles.container}>
      <Text>CarouselScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },
});