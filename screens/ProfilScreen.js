import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, Animated, LayoutAnimation, UIManager, Platform, Button, Dimensions, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LongButton from "../components/LongButton";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faCamera, faTimes, faImages, faImage } from '@fortawesome/free-solid-svg-icons';
import { LineChart} from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [history, setHistory] = useState([45, 40, 70, 80, 50, 30, 10]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.profilePicContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profilePic} />
        ) : (
          <FontAwesomeIcon icon={faImage} size={24} style={styles.profilePic} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openCamera} style={[styles.button, styles.buttonCamera]}>
          <FontAwesomeIcon icon={faCamera} size={24} color={"white"} />
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage} style={[styles.button, styles.buttonGallery]}>
          <FontAwesomeIcon icon={faImage} size={24} color={"white"} />
          <Text style={styles.buttonText}>Charger de la galerie</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.settingsIcon}>
        <FontAwesomeIcon icon={faCog} size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>Salut {user.username}</Text>

    <Text style={styles.historyTitle}>
        Historique des scores de la semaine
      </Text>
      <LineChart
        data={{
          labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          datasets: [{ data: history }],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        chartConfig={{
          backgroundColor: "#41F67F",
          backgroundGradientFrom: "#085229",
          backgroundGradientTo: "#41F67F",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 12,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

<LongButton color={"#41F67F"} onPress={() => navigation.navigate("Places")} text="Voir mes structures" />



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
    </SafeAreaView>
  );
};

const DrawerNav = ({navigation, closeDrawer}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Home')
  }

  // const handleDelete = () => {
  //   console.log(user)
  //   fetch(`http://172.20.10.2:3000/users/deleteUser/${user.username}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       username: user.username,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.result) {
  //         dispatch(logout());
  //         navigation.navigate('Home')
  //       }
  //     });
  // };


  //   dispatch(logout());
  //   navigation.navigate('Home')
  // }


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

<Text style={{}} onPress={() => handleLogout()}>Se déconnecter</Text>
<Text style={{}} onPress={() => handleDelete()}>Supprimer le compte</Text>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  drawerContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#FFF", // Fond blanc pour le tiroir
    width: 220, // Largeur du tiroir
    borderWidth: 2,
    borderColor: "#41F67F", // Bordure verte
    zIndex: 1, // Assurez-vous que le tiroir est bien au-dessus des autres éléments
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center', // Centre le contenu verticalement
    alignItems: 'center', // Centre le contenu horizontalement
    overflow: 'hidden', // Empêche l'image de déborder
    borderWidth: 2,
    borderColor: "#41F67F",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#41F67F",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%', // Utiliser un pourcentage de la largeur pour une meilleure réactivité
    marginBottom: 20,
    marginTop: 20, // Ajouter un espace au-dessus des boutons
  },
  button: {
    paddingVertical: 12, // Un peu plus de padding vertical pour un toucher plus confortable
    paddingHorizontal: 20,
    borderRadius: 20, // Bordures arrondies pour un look plus moderne
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3, // Ajouter une ombre sous Android
    shadowColor: "#000", // Ombre pour iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonCamera: {
    backgroundColor: "#41F67F",
  },
  buttonGallery: {
    backgroundColor: "#085229",
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
  settingsIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
  },
  title: {
    fontSize: 22,
    color: '#41F67F',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  
  
});

export default ProfilScreen;
