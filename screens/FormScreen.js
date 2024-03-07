import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import LongButton from "../components/LongButton";
import { FontAwesome } from "@expo/vector-icons";

export default function FormScreen({ navigation }) {
    const [structureName, setStructureName] = useState('');
    const [structureCategory, setStructureCategory] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [dataSet, setDataSet] = useState([]);

    const userToken = useSelector((state) => state.user.value.token);

    const searchAddress = (query) => {
      if (query === "") {
          return;
      }

      fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`)
          .then((response) => response.json())
          .then(({ features }) => {
              const suggestions = features.map((feature, i) => ({
                  id: String(i),
                  title: feature.properties.label,
              }));
              setDataSet(suggestions);
          })
          .catch((error) => console.error(error));
  };

  const handleSelectAddress = (item) => {
    if (item) {
      // Requête pour obtenir les détails de l'adresse sélectionnée
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${item.title}&limit=1`)
        .then((response) => response.json())
        .then((data) => {
          if (data.features.length > 0) {
            const addressDetails = data.features[0].properties;
            // Met à jour l'adresse avec seulement le nom (sans le code postal ni la ville)
            setAddress(addressDetails.name);
            setCity(addressDetails.city);
            setPostalCode(addressDetails.postcode);
          }
        })
        .catch((error) => console.error("Erreur lors de la récupération des détails de l'adresse:", error));
    }
  };
  



    const handleNewStructureSubmit = () => {
        fetch("http://172.20.10.2:3000/structures/newStructure", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                name: structureName,
                category: structureCategory,
                address: address,
                city: city,
                postalCode: postalCode,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log("Structure ajoutée avec succès");
            } else {
                console.log("Erreur lors de l'ajout de la structure", data.error);
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi de la requête", error);
        });
    };

    return (
        <AutocompleteDropdownContextProvider>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableOpacity onPress={() => navigation.navigate("Map")} style={styles.backButton}>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nom de la structure</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le nom de la structure"
                            onChangeText={(value) => setStructureName(value)}
                            value={structureName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Catégorie de la structure</Text>
                        <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.input}>
                            <Text style={styles.inputText}>
                                {structureCategory || "Sélectionner votre catégorie"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        visible={isPickerVisible}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Picker
                                    selectedValue={structureCategory}
                                    onValueChange={(value) => setStructureCategory(value)}
                                    style={{ width: 250, height: 200 }}
                                >
                                    <Picker.Item label="Magasin éco/bio" value="Magasin Éco-bio" />
                                    <Picker.Item label="Association" value="Association" />
                                    <Picker.Item label="Écolieu" value="Écolieu" />
                                    <Picker.Item label="Point de tri" value="Point de tri" />
                                </Picker>
                                <Button title="Fermer" onPress={() => setPickerVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Adresse</Text>
                        <AutocompleteDropdown
    dataSet={dataSet}
    onChangeText={searchAddress}
    onSelectItem={(item) => item && handleSelectAddress(item)}
    textInputProps={{
        placeholder: "Tapez pour rechercher une adresse...",
        autoCorrect: false,
        style: styles.input
    }}
/>

                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Ville"
                        onChangeText={setCity}
                        value={city}
                    />

<TextInput
                        style={styles.input}
                        placeholder="Code Postal"
                        value={postalCode}
                        editable={false} // Empêcher la modification manuelle
                    />

                    <LongButton color={"#41F67F"} onPress={handleNewStructureSubmit} text="Ajouter une structure" />
                </View>
            </KeyboardAvoidingView>
        </AutocompleteDropdownContextProvider>
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
        marginTop: 5,
    },
    inputText: {
        fontSize: 16,
    },
    registerContainer: {
        marginTop: 10,
        justifyContent: "center",
        gap: 15,
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
