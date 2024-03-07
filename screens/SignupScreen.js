import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import LongButton from "../components/LongButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { login } from "../reducers/user";

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    fetch("http://172.20.10.13:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.userData._id)
        if (data.result) {
          dispatch(
            login({
              username: signUpUsername,
              email: signUpEmail,
              token: data.token,
              id: data.userData._id,
            })
          );

          navigation.navigate("TabNavigator");
          setSignUpUsername("");
          setSignUpEmail("");
          setSignUpPassword("");
        } else {
          console.log("Errror", data);
          setError("Votre compte n'a pas pu être créé.");
        }

      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Bouton de retour en haut à gauche */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
      >
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={require("../assets/Ecotrack-logo.png")}
      />
      <Text style={styles.title}>ECOTRACK</Text>
      <Text>S'inscrire</Text>
      <View style={styles.registerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom d'utilisateur</Text>
          <TextInput
            style={styles.input}
            placeholder="JohnDoe"
            onChangeText={(value) => setSignUpUsername(value)}
            value={signUpUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Email@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => setSignUpEmail(value)}
            value={signUpEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry={true}
            autoCapitalize="none"
            textContentType="password"
            autoComplete="password"
            onChangeText={(value) => setSignUpPassword(value)}
            value={signUpPassword}
          />
        </View>
        <View>
          <LongButton
            color={"#41F67F"}
            onPress={() => handleRegister()}
            text="Créer un compte"
          />
        </View>
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// style={styles.inputContainer}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
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
    marginTop: 0,
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

  text: {
    marginTop: 20,
    fontSize: 20,
  },
  color: {
    backgroundColor: "#41F67F",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 10,
    justifyContent: "center",
    gap: 15,
    alignItems: "center",
  },
});
