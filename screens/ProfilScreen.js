import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
  Button,
  Dimensions,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import LongButton from "../components/LongButton";
import DoneActivities from "../components/DoneActivities";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCog,
  faCamera,
  faTimes,
  faImages,
  faImage,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeAllActivities } from "../reducers/activities";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProfilScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-220)).current;
  const [history, setHistory] = useState([45, 40, 70, 80, 50, 30, 10]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chartParentWidth, setChartParentWidth] = useState(0);
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
      const mediaLibraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (
        cameraStatus.status !== "granted" ||
        mediaLibraryStatus.status !== "granted"
      ) {
        alert(
          "Désolé, nous avons besoin des permissions de caméra et de bibliothèque de photos pour faire cela!"
        );
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
      <Animated.View
        style={[
          styles.drawerContainer,
          {
            transform: [{ translateX: drawerAnimation }],
            height: Dimensions.get("window").height,
          },
        ]}
      >
        {isDrawerOpen && (
          <DrawerNav
            closeDrawer={closeDrawerAnimated}
            navigation={navigation}
          />
        )}
      </Animated.View>
      {isDrawerOpen && (
        <TouchableOpacity
          style={{
            backgroundColor: "#00000033",
            height: Dimensions.get("window").height,
            position: "absolute",
            top: -60,
            zIndex: 2,
            left: 0,
            width: 800,
          }}
          onPress={() => closeDrawerAnimated()}
        ></TouchableOpacity>
      )}

      <ScrollView>
        <View style={styles.profilHeader}>
          <Text style={styles.h1}>PROFIL</Text>
          <TouchableOpacity onPress={toggleDrawer} style={styles.settingsIcon}>
            <FontAwesomeIcon icon={faCog} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.profilContent}>
          <View style={styles.profilePicContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profilePic} />
            ) : (
              <FontAwesomeIcon
                icon={faImage}
                size={24}
                style={styles.profilePic}
              />
            )}
          </View>
          <Text style={styles.profilName}>Bonjour {user.username},</Text>
          {/* <TouchableOpacity
            onPress={openCamera}
            style={styles.addPictureBtn}
          >
            <Text style={styles.buttonText2}>Editer votre profil</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={pickImage}
            style={styles.addPictureBtn}
          >
            <FontAwesomeIcon icon={faImage} size={18} color={"black"} />
            <Text style={styles.buttonText2}>Charger de la galerie</Text>
          </TouchableOpacity> */}
          <LongButton
            color={"#41F67F"}
            onPress={() => navigation.navigate("Places")}
            text="Voir vos structures"
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.h2}>Historique des scores de la semaine</Text>
          <View style={styles.graphicContainer}>
            <View
              onLayout={({ nativeEvent }) =>
                setChartParentWidth(nativeEvent.layout.width)
              }
              style={styles.historyContainer}
            >
              <LineChart
                data={{
                  labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
                  datasets: [{ data: history }],
                }}
                width={chartParentWidth}
                height={220}
                chartConfig={{
                  backgroundColor: "#41F67F",
                  backgroundGradientFrom: "#085229",
                  backgroundGradientTo: "#41F67F",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                bezier
                style={{
                  marginVertical: 8,
                  marginHorizontal: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>

          <View style={styles.activitiesInput}>
            <DoneActivities></DoneActivities>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DrawerNav = ({ navigation, closeDrawer }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllActivities());
    navigation.navigate("Home");
  };

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

  return (
    <View>
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => closeDrawer()}
      >
        <FontAwesomeIcon icon={faTimes} size={24} />
      </TouchableOpacity>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={openCamera} style={styles.addPictureBtn}>
          <FontAwesomeIcon icon={faCamera} size={18} color={"#085229"} />
          <Text style={styles.buttonText2}>Prendre une photo de profil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.addPictureBtn}>
          <FontAwesomeIcon icon={faImages} size={18} color={"#085229"} />
          <Text style={styles.buttonText2}>Charger de la galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.addPictureBtn}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size={18}
            color={"#085229"}
          />
          <Text style={styles.buttonText2}>Se déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.addPictureBtn}>
          <FontAwesomeIcon icon={faTrash} size={18} color={"#085229"} />
          <Text style={styles.buttonText2}>Supprimer le compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-start",
    // paddingTop: 50,
    // paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  drawerContainer: {
    padding: 20,
    paddingTop: 70,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#FFF", // Fond blanc pour le tiroir
    width: 220, // Largeur du tiroir
    borderWidth: 2,
    borderColor: "#41F67F", // Bordure verte
    zIndex: 1000, // Assurez-vous que le tiroir est bien au-dessus des autres éléments
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center", // Centre le contenu verticalement
    alignItems: "center", // Centre le contenu horizontalement
    overflow: "hidden", // Empêche l'image de déborder
    borderWidth: 2,
    borderColor: "#41F67F",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#41F67F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%", // Utiliser un pourcentage de la largeur pour une meilleure réactivité
    marginBottom: 20,
    marginTop: 20, // Ajouter un espace au-dessus des boutons
  },
  button: {
    paddingVertical: 12, // Un peu plus de padding vertical pour un toucher plus confortable
    paddingHorizontal: 20,
    borderRadius: 20, // Bordures arrondies pour un look plus moderne
    flexDirection: "row",
    alignItems: "center",
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
    width: "40%",
  },
  buttonGallery: {
    backgroundColor: "#085229",
    width: "40%",
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
  },
  buttonText2: {
    color: "black",
    marginLeft: 10,
  },
  settingsIcon: {
    // position: "absolute",
    top: 10,
    // top: Platform.OS === "ios" ? 40 : 60,
    right: 30,
  },
  profilHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  profilContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  activitiesInput: {
    marginTop: 20,
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
  profilName: {
    fontSize: 20,
    color: "#085229",
    fontWeight: "500",
    marginBottom: 10,
  },
  historyContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
    width: "90%",
    // backgroundColor: "red"
  },
  graphicContainer: {
    alignItems: "center",
  },
  addPictureBtn: {
    // backgroundColor: "red",
    flexDirection: "row",
    color: "black",
  },
  menuContainer: {
    gap: 20,
    marginTop: 30,
    width: 150,
  },
  bodyContainer: {
    gap: 5,
    marginTop: 30,
  }
});

export default ProfilScreen;
