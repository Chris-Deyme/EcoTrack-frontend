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
// import ShortButton from "../components/ShortButton";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import config from "../config";


const icons = {
  ["Point de tri"]: require("../assets/tri.png"),
  Association: require("../assets/association.png"),
  ['Magasin éco/bio']: require("../assets/shop.png"),
  Écolieu: require("../assets/ecolieu.png"),
};

export default function MapScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 48.853, // Valeur par défaut centrée sur Paris
    longitude: 2.349,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    fetch(`${config.IP_ADDRESS}/structures/showStructure/`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.structures) {
          setPlaces(data.structures); 
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }

    const response = await fetch(`${config.IP_ADDRESS}/structures/showStructure/`)
    const items = await response.json()
    console.log(items)
    const suggestions = items.structures
      .filter((item) => item.name.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.id,
        title: item.name,
      }))
    setSuggestionsList(suggestions)
    // setLoading(false)
  }, [])

  



  const onSelectItem = useCallback((item) => {
    if (item) {
      const selectedLocation = places.find(
        (structures) => structures.id === parseInt(item.id, 10)
      );
      if (selectedLocation) {
        const { latitude, longitude } = selectedLocation.coordinates;
        setMapRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0075,
          longitudeDelta: 0.0075,
        });
      }
    }
  }, []);
  



  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Retrouvez une structure</Text>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Rechercher</Text>
          </View>
          <AutocompleteDropdown
            direction={Platform.select({ ios: "down" })}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={onSelectItem}
            debounce={600}
            textInputProps={{
              placeholder: "Rechercher une structure",
            }}
            inputContainerStyle={styles.input}
            suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          />
        </View>

        {/* Le Modal reste inchangé */}

        {/* <MapView
          style={styles.map}
          region={mapRegion}
          mapType={Platform.OS === "ios" ? "hybridFlyover" : "hybrid"}
          initialRegion={{
            latitude: 48.853, // Default to Paris if no location
            longitude: 2.349,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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

          {initialLocations.map((location, index) => {
            let distance = currentLocation
              ? getDistanceFromLatLonInKm(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  location.coordinates.latitude,
                  location.coordinates.longitude
                ).toFixed(2)
              : "Unknown";

            return (
              <Marker
                key={index}
                coordinate={location.coordinates}
                title={location.name}
                description={`Distance: ${distance} km`}
                image={icons[location.type]}
              />
            );
          })}
        </MapView> */}

<MapView
  style={styles.map}
  region={mapRegion}
  mapType={Platform.OS === "ios" ? "hybridFlyover" : "hybrid"}
  initialRegion={{
    latitude: 48.853, // Default to Paris if no location
    longitude: 2.349,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
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

  {places.map((place, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: place.address.latitude, 
        longitude: place.address.longitude,
      }}
      title={place.name}
      description={`Type: ${place.category}`}
      image={icons[place.category]} 
    />
  ))}
</MapView>

        <View style={styles.buttonContainer}>
          <LongButton
            color={"#41F67F"}
            onPress={() => navigation.navigate("Form")}
            text="Ajouter une structure"
          />
        </View>
      </SafeAreaView>
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
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
    marginTop: 0,
    marginBottom: 10,
    alignItems: "center",
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6, // La carte prend maintenant 80% de l'écran
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
    alignItems: "center", // Centre horizontalement dans le conteneur
    marginTop: 20, // Espace au-dessus du bouton, ajustez selon vos besoins
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: "#085229",
    fontFamily: "Poppins",
  },
});
