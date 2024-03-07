import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, Animated, LayoutAnimation, UIManager, Platform, Button, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faCamera, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import { LineChart} from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

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
  const [history, setHistory] = useState([10, 20, 30, 40, 50, 60, 70]);





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
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />


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
