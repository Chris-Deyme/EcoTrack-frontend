import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const StructuresScreen = () => {
  // Données de structures simulées
  const structures = [
    { id: 1, name: 'Structure 1' },
    { id: 2, name: 'Structure 2' },
    { id: 3, name: 'Structure 3' },
  ];

  // Fonction simulée pour la suppression
  const handleDelete = (structureId) => {
    console.log(`Suppression de la structure avec l'ID: ${structureId}`);
    // Implémenter la logique de suppression ici
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mes Structures</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {structures.map((structure) => (
          <View key={structure.id} style={styles.card}>
            <Text style={styles.name}>{structure.name}</Text>
            <TouchableOpacity onPress={() => handleDelete(structure.id)}>
              <FontAwesome name="trash" size={24} color="#ec6e5b" />
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
});

export default StructuresScreen;
