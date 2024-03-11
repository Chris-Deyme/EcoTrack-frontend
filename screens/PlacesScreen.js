import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../reducers/user';

const StructuresScreen = ({navigation}) => {
  // Données de structures simulées
  const structures = [
    { id: 1, name: 'Structure 1' },
    { id: 2, name: 'Structure 2' },
    { id: 3, name: 'Structure 3' },
    { id: 4, name: 'Structure 4' },
  ];
  const IP_ADDRESS = "172.20.10.13:3000";

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [structure, setStructure] = useState([])

  useEffect(() => {
    console.log("Reduce", user.id);
    fetch(`http://${IP_ADDRESS}/structures/showStructure/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.userData)
        if (data.userData) {
          setStructure(data.userData)
        }
      });
  }, []);

  const handleDelete = (id) => {
    console.log(`Tentative de suppression de la structure avec l'ID: ${id}`);
  
    fetch(`http://${IP_ADDRESS}/structures/deleteStructure/${id}`, {
      method: 'DELETE', 
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log(data.response);
        
          setStructure(structure.filter(s => id !== s._id));
        } else {
          console.log('Erreur lors de la suppression :', data.error);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la structure:', error);
      });
  };
  
 

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.backButton}>
                    <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
      <Text style={styles.title}>Mes Structures</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {structure.map((structure, index) => 
         
        (
       
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{structure.name}</Text>
            <TouchableOpacity onPress={() => handleDelete(structure._id)}>
              <FontAwesome name="trash" size={24} color="#41F67F" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
},
});

export default StructuresScreen;
