import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faCamera } from '@fortawesome/free-solid-svg-icons';

const ProfilScreen = (navigation) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Désolé, nous avons besoin des permissions de caméra pour faire cela!');
      }
    })();
  }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.profilePicContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profilePic} />
        ) : (
          <FontAwesomeIcon icon={faCamera} size={24} style={styles.profilePic} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}style={styles.settingsIcon}>
      <FontAwesomeIcon icon={faCog} size={24} />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profilePicContainer: {
    alignSelf: 'flex-start',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  settingsIcon: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
});

export default ProfilScreen;
