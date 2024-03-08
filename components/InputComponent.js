import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function InputComponent(label, placeholder, keyboardType) {
  return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} placeholder={placeholder} keyboardType={keyboardType}/>
      </View>
  )
}
const styles = StyleSheet.create({
   inputContainer: {
    marginTop: 10
   },
   label: {
    fontSize: 10,
    paddingLeft: 10,
   },
   input: {
    width: 288,
    height: 51,
    borderWidth: 1,
    borderColor: "#41F67F",
    borderRadius: 10,
    paddingLeft: 10,
   },
});
