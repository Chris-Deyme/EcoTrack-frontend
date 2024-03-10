import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import LongButton from "../components/LongButton";
import EcotrackLogo from "../components/EcotrackLogo"
import { FontAwesome } from "@expo/vector-icons";
import { login } from "../reducers/user";

export default function SigninScreen({ navigation }) {
  const [signInEmail, setSignInEmail] = useState("test@gmail.com");
  const [signInPassword, setSignInPassword] = useState("testCapsule");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  // const signinFetch = "172.20.10.2";
  // const signinFetch = "172.20.10.3";
  const signinFetch = "192.168.1.20";

  const handleConnection = () => {
    // fetch("http://192.168.1.20:3000/users/signin", {
    fetch(`http://${signinFetch}:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              email: signInEmail,
              token: data.token,
              id: data.userData._id,
              username: data.userData.username,
            })
          );
          setSignInEmail("");
          setSignInPassword("");
          navigation.navigate("TabNavigator");
        } else {
          setError("La connection a échoué.");
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

      {/* Logo du composant */}
      <EcotrackLogo />
      <Text>Connexion</Text>
      <View style={styles.registerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Email@gmail.com"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) => setSignInEmail(value)}
            value={signInEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry={true}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            onChangeText={(value) => setSignInPassword(value)}
            value={signInPassword}
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>

        <LongButton
          color={"#41F67F"}
          onPress={() => handleConnection()}
          text="Se connecter"
        />
        <LongButton color={"#fff"} text="Mot de passe oublié ?" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  buttonview: {
    marginTop: 20,
  },
  registerContainer: {
    marginTop: 10,
    justifyContent: "center",
    gap: 15,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
