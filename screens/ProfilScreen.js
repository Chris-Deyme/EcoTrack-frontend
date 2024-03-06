import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, Animated, LayoutAnimation, UIManager, Platform, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faCamera, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProfilScreen = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-220)).current;


  const openDrawerAnimated = () => {
    Animated.spring(drawerAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsDrawerOpen(true); // Mettre à jour l'état
  };

  const closeDrawerAnimated = () => {
    Animated.spring(drawerAnimation, {
      toValue: -220,
      useNativeDriver: true,
    }).start();
    setIsDrawerOpen(false); // Mettre à jour l'état
  };

 
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaLibraryStatus.status !== 'granted') {
        alert('Désolé, nous avons besoin des permissions de caméra et de bibliothèque de photos pour faire cela!');
      }
    })();
  }, []);
 
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      closeDrawerAnimated();
    } else {
      openDrawerAnimated();
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

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => pickImage()} style={{backgroundColor:"red", padding:30}}>
        <Text>Pick an image from camera roll</Text>
        </TouchableOpacity>
    </View>

      <Animated.View
        style={[
          styles.drawerContainer,
          {
            transform: [{ translateX: drawerAnimation }],
          },
        ]}
      >
        {
          isDrawerOpen &&
          <DrawerNav closeDrawer={closeDrawerAnimated} navigation={navigation} />
        }
      </Animated.View>

<TouchableOpacity onPress={toggleDrawer} style={styles.settingsIcon}>
        <FontAwesomeIcon icon={faCog} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const DrawerNav = ({navigation, closeDrawer}) => {
return (
  <View style={{
    flex:1,
    position:"absolute",
    height:"110%",
    zIndex:-1,
    backgroundColor:"white"
    
    }}>

<View style={{
  height:"100%",
  borderRightColor: 'black',
  borderBottomWidth: 1,
  backgroundColor:"white",
  top:0,
  left:0,
  width:220,
  display:"flex",
  flexDirection:"column",
  padding:20, 
 }}> 

<TouchableOpacity  style={{alignSelf:'flex-end'}}  onPress={() => closeDrawer()}>
      <FontAwesomeIcon icon={faTimes}  size={24} />
      </TouchableOpacity>

<Text style={{}} onPress={() => navigation.navigate('Home')}>Se déconnecter</Text>
    </View>
    <TouchableOpacity style={{
      backgroundColor:"#0000",
      height:"110%",
      position:"absolute",
      top:0,
      zIndex:20,
      left:220,
      width:500,
      }} onPress={() => closeDrawer()}>

    </TouchableOpacity>
  </View>

)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerContainer: {
    flex: 1,
    position: "absolute",
    height: "110%",
    backgroundColor: "black",
    width: 220, // Assurez-vous que cela correspond à la valeur initiale dans useRef
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
