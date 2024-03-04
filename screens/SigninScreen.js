import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import LongButton from '../components/LongButton';
import { FontAwesome } from '@expo/vector-icons'; 


export default function SigninScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {

      navigation.navigate('TabNavigator');
  };


  return (
   <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      <Image style={styles.image} source={require("../assets/Ecotrack-logo.png")} />
      <Text style={styles.title}>ECOTRACK</Text>
      <Text>Connexion</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} placeholder='Email@gmail.com' keyboardType="email-address"/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput style={styles.input} placeholder='********' secureTextEntry={true}
            autoCapitalize="none" 
            keyboardType="email-address" 
            textContentType="emailAddress" 
            autoComplete="email" 
            onChangeText={(value) => setEmail(value)}
            value={email}
          />

          {emailError && <Text style={styles.error}>Invalid email address</Text>}
      </View>
      <View>
         <LongButton color={"#41F67F"} onPress={() => handleSubmit()} text="Se connecter" />
         <LongButton color={"#fff"}  text="Mot de passe oublié ?" />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
   backButton: {
      position: 'absolute',
      top: 60, 
      left: 0,
    },
   image: {
      width: 250,
      height: 250,
   },
   title: {
      fontSize: 36,
      textAlign: "center",
      fontWeight: "700",
   },
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
   button: {
      justifyContent: "center",
      width: 288,
      height: 51,
      backgroundColor: "#fff",
      borderWidth: 2,
      borderColor: "#41F67F",
      borderRadius: 10,
      marginTop: 20,
   },
   shadow: {
      shadowColor: "#000",
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 0.9,
      shadowRadius: 44,
      elevation: 5, 
    },
    btnText: {
      fontSize: 20,
      textAlign: "center",
   },
   color: {
      backgroundColor: "#41F67F",
   }
});
