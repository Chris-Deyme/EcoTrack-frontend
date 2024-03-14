import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Alert,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LongButton from "../components/LongButton";
import ShortButton from "../components/ShortButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCog,
  faCamera,
  faTimes,
  faImages,
  faImage,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import config from "../config";
import RadioGroup from "react-native-radio-buttons-group";
import RadioForm from "react-native-simple-radio-button";

import { useSelector, useDispatch } from "react-redux";

const icons = {
  ["Point de tri"]: require("../assets/tri.png"),
  Association: require("../assets/association.png"),
  ["Magasin Éco-bio"]: require("../assets/shop.png"),
  Écolieu: require("../assets/ecolieu.png"),
};

const options = [
  {
    id: "all",
    label: "Tous",
    value: "all",
  },
  {
    id: "Point de tri",
    label: "Point de tri",
    value: "Point de tri",
  },
  {
    id: "Association",
    label: "Association",
    value: "Association",
  },
  {
    id: "Écolieu",
    label: "Écolieu",
    value: "Écolieu",
  },
  {
    id: "Magasin Éco-bio",
    label: "Magasin Éco-bio",
    value: "Magasin Éco-bio",
  },

];

export default function MapScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [loading, setLoading] = useState(false); //!
  const [mapRegion, setMapRegion] = useState({
    latitude: 48.853, // Valeur par défaut centrée sur Paris
    longitude: 2.349,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [places, setPlaces] = useState([]);
  const user = useSelector((state) => state.user.value);

  // Permissions utilisateurs pour se servir de la map
  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 100 }, (location) => {
          setCurrentLocation(location.coords);
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      }));
    }
  }, [currentLocation]);

  // fetch toutes les structures
  useEffect(() => {
    console.log("testui", user);
    fetch(`${config.IP_ADDRESS}/structures/showStructure/`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.structures) {
          setPlaces(data.structures);
          setTimeout(() => {
            //!
            setLoading(true);
          }, 5000);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [user.structuresAdded]); //!

  const getSuggestions = async (q) => {
    const filterToken = q.toLowerCase();

    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }

    const suggestions = places
      .filter((item) => item.name.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item._id,
        title: item.name,
      }));

    setSuggestionsList(suggestions);
    // setLoading(false)
  };

  const onSelectItem = (item) => {
    if (item) {
      const selectedLocation = places.find(
        (structure) => structure._id == item.id
      );

      if (selectedLocation) {
        const { latitude, longitude } = selectedLocation.address;
        setMapRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0075,
          longitudeDelta: 0.0075,
        });
      }
    }
  };

  const onPress = (radioButtons) => {
    console.log("ok", radioButtons);
    setSelectedCategory(radioButtons);
  };

  return (
    <AutocompleteDropdownContextProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <SafeAreaView>
            <Text style={styles.h1}>CARTE</Text>
          </SafeAreaView>

          <View style={styles.topBar}>
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Rechercher</Text>

                {!!places.length && (
                  <AutocompleteDropdown
                    direction={Platform.select({ ios: "down" })}
                    dataSet={suggestionsList}
                    onChangeText={getSuggestions}
                    onSelectItem={onSelectItem}
                    debounce={600}
                    textInputProps={{
                      placeholder: "Rechercher une structure...",
                    }}
                    inputContainerStyle={styles.input}
                    suggestionsListMaxHeight={
                      Dimensions.get("window").height * 0.4
                    }
                  />
                )}
              </View>
              <View style={styles.btnContainer}>
                <ShortButton
                  color={"#41F67F"}
                  icon={faSliders}
                  startColor={"#085229"}
                  onPress={() => setFilterModalVisible(true)}
                  style={styles.btnSearch}
                ></ShortButton>
              </View>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={filterModalVisible}
              onRequestClose={() => {
                setFilterModalVisible(!filterModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Sélectionner une catégorie :
                  </Text>
                  <View style={styles.radioGroup}>
                    <RadioForm
                      radio_props={options}
                      onPress={(e) => onPress(e)}
                      initial={options.findIndex((option) => option.value === selectedCategory)}
                      selectedId={selectedCategory}
                      style={styles.radioTextGroup}
                      buttonColor={"#41F67F"}
                      selectedButtonColor={"#085229"}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => setFilterModalVisible(!filterModalVisible)}
                  >
                    <Text style={styles.textReturn}>Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <MapView
            style={styles.map}
            region={mapRegion}
            mapType={Platform.OS === "ios" ? "hybridFlyover" : "hybrid"}
            initialRegion={mapRegion}
          >
            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Votre position actuelle"
                pinColor="#FF0000"
              />
            )}

            {places
              .filter((place) =>
                selectedCategory === "all"
                  ? true
                  : place.category === selectedCategory
              )
              ?.map((place, index) => {
                let distance = currentLocation
                  ? getDistanceFromLatLonInKm(
                      currentLocation.latitude,
                      currentLocation.longitude,
                      place.address.latitude,
                      place.address.longitude
                    ).toFixed(2)
                  : "Unknown";

                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: place.address.latitude,
                      longitude: place.address.longitude,
                    }}
                    title={place.name}
                    description={`Type: ${place.category} Distance: ${distance} km`}
                    image={icons[place.category]}
                  />
                );
              })}
          </MapView>

          <View style={styles.buttonContainer}>
            <LongButton
              color={"#41F67F"}
              onPress={() => navigation.navigate("Form")}
              text="Ajouter une structure"
            />
          </View>
        </View>
      </ScrollView>
    </AutocompleteDropdownContextProvider>
  );
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Rayon de la terre en km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance en km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    // alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between", // Ajustement pour espacer les éléments
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 12,
  },
  input: {
    width: 260,
    height: 51,
    borderWidth: 1,
    borderColor: "#41F67F",
    borderRadius: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.55, // La carte prend maintenant 80% de l'écran
  },
  addButton: {
    marginBottom: 20, // Ajustez selon vos besoins
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
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
  },

  filterButton: {
    marginBottom: 15,
    padding: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 50,
  },
  suggestionItem: {
    padding: 15,
    backgroundColor: "#FFF", // Fond blanc ou autre couleur selon votre design
    borderColor: "#41F67F", // Couleur de bordure pour correspondre à votre design
    borderWidth: 1,
    borderRadius: 10,
    color: "#000", // Texte noir ou autre couleur selon votre design
    fontSize: 16, // Taille de police adaptée
    marginVertical: 2, // Espacement vertical pour séparer les éléments
  },
  labelContainer: {
    width: 288,
    marginLeft: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: "#085229",
    // fontFamily: "Poppins",
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginBottom: 3,
    color: "black",
    // fontFamily: "Poppins",
  },
  h1: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 20,
    color: "#41F67F",
  },
  btnContainer: {
    justifyContent: "center",
    marginTop: 10,
  },
  radioTextGroup: {
    alignItems: "flex-start",
    color: "black",
    gap: 5,

  },
  radioGroup: {
    backgroundColor: "white",
    width: 200,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#41F67F",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContainer: {
    gap: 10,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "white",
  },
});
