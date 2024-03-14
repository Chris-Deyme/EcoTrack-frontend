import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  UIManager,
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
import { logout, addImgToStore } from "../reducers/user";
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

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      closeDrawerAnimated();
    } else {
      openDrawerAnimated();
    }
  };

  return (
    <View style={styles.container}>
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
        <SafeAreaView style={styles.profilHeader}>
          <Text style={styles.h1}>PROFIL</Text>
          <TouchableOpacity onPress={toggleDrawer} style={styles.settingsIcon}>
            <FontAwesomeIcon icon={faCog} size={24} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.profilContent}>
          <View style={styles.profilePicContainer}>
            {user.image ? (
              <Image source={{ uri: user.image }} style={styles.profilePic} />
            ) : (
              <FontAwesomeIcon
                icon={faImage}
                size={24}
                style={styles.profilePic}
              />
            )}
          </View>
          <Text style={styles.profilName}>Bonjour {user.username},</Text>
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
    </View>
  );
};

const DrawerNav = ({ navigation, closeDrawer }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [image, setImage] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllActivities());
    navigation.navigate("Onboard");
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      dispatch(addImgToStore({ image: result.assets[0].uri }));
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(addImgToStore({ image: result.assets[0].uri }));
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
    backgroundColor: "#ffffff",
  },
  drawerContainer: {
    padding: 20,
    paddingTop: 70,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#FFF",
    width: 220,
    borderWidth: 2,
    borderColor: "#41F67F",
    zIndex: 1000,
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    top: 10,
    right: 30,
  },
  profilHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  profilContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  activitiesInput: {
    marginTop: 20,
    paddingBottom: 30,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginBottom: 3,
    color: "black",
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
  },
  graphicContainer: {
    alignItems: "center",
  },
  addPictureBtn: {
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
  },
});

export default ProfilScreen;
