import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, Alert, Modal, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import LongButton from "../components/LongButton";
import ShortButton from "../components/ShortButton";

const initialLocations = [
  {
    "id": 1,
    "name": "Notre Dame de Paris",
    "type": "church",
    "coordinates": {
      "latitude": 48.867,
      "longitude": 2.328
    }
  },
  {
    "id": 2,
    "name": "Mont Saint-Michel",
    "type": "church",
    "coordinates": {
      "latitude": 48.634,
      "longitude": -1.511
    }
  },
  {
    "id": 3,
    "name": "Mont Blanc",
    "type": "mountain",
    "coordinates": {
      "latitude": 45.831,
      "longitude": 6.865
    }
  },
  {
    "id": 4,
    "name": "Parc Astérix",
    "type": "attraction",
    "coordinates": {
      "latitude": 49.134,
      "longitude": 2.571
    }
  },
  {
    "id": 5,
    "name": "So Ouest",
    "type": "shopping",
    "coordinates": {
      "latitude": 48.893,
      "longitude": 2.298
    }
  },
  {
    "id": 6,
    "name": "Big Ben",
    "type": "monument",
    "coordinates": {
      "latitude": 51.5,
      "longitude": -1.124
    }
  },
  {
    "id": 7,
    "name": "Googleplex",
    "type": "business",
    "coordinates": {
      "latitude": 37.422,
      "longitude": -122.084
    }
  },
  {
    "id": 8,
    "name": "Big Ben",
    "type": "monument",
    "coordinates": {
      "latitude": 51.5,
      "longitude": -1.124
    }
  },
  {
    "id": 9,
    "name": "Fourvière",
    "type": "church",
    "coordinates": {
      "latitude": 45.762,
      "longitude": 4.822
    }
  },
  {
    "id": 10,
    "name": "Cdiscount",
    "type": "business",
    "coordinates": {
      "latitude": 44.861,
      "longitude": -0.552
    }
  },
  {
    "id": 11,
    "name": "Fourvière",
    "type": "church",
    "coordinates": {
      "latitude": 45.762,
      "longitude": 4.822
    }
  },
  {
    "id": 12,
    "name": "Ricard",
    "type": "business",
    "coordinates": {
      "latitude": 43.306,
      "longitude": 5.366
    }
  },
  {
    "id": 13,
    "name": "Kilimanjaro",
    "type": "mountain",
    "coordinates": {
      "latitude": -3.068,
      "longitude": 37.355
    }
  }
];

const icons = {
  church: require('../assets/church.png'),
  mountain: require('../assets/mountain.png'),
  shopping: require('../assets/shop.png'),
  attraction: require('../assets/attraction.png'),
  monument: require('../assets/monument.png'),
  business: require('../assets/business.png'),
};

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);


  const filteredLocations = selectedCategory === 'all' ? initialLocations : initialLocations.filter(location => location.type === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Rechercher</Text>
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
       <View style={styles.buttonContainer}>
        <ShortButton 
          color={"#41F67F"} 
          onPress={() => { /* Logique pour ajouter un point */ }} 
          text="Ajouter un point" 
        />
      </View>
      </View>
      
      {/* Le Modal reste inchangé */}
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.853, // Default to Paris if no location
          longitude: 2.349,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* {currentLocation && (
          // <Marker
          //   coordinate={currentLocation}
          //   title="Current Location"
          //   pinColor="#FF0000"
          // />
        )} */}

        {initialLocations.map((location, index) => {
          let distance = currentLocation ? getDistanceFromLatLonInKm(
            currentLocation.latitude,
            currentLocation.longitude,
            location.coordinates.latitude,
            location.coordinates.longitude
          ).toFixed(2) : 'Unknown';

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
      </MapView>

    <LongButton color={"#41F67F"} onPress={() => { /* Logique pour ajouter un point */ }} text="Ajouter un point" />  
     </View>
  );
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Rayon de la terre en km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance en km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6, // La carte prend maintenant 80% de l'écran
  },
  addButton: {
    marginBottom: 20, // Ajustez selon vos besoins
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center', // Centre horizontalement dans le conteneur
    marginTop: 20, // Espace au-dessus du bouton, ajustez selon vos besoins
  },
});

