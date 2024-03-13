import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ShortButton from "./ShortButton";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import config from "../config";
import { addCategoryToStore } from "../reducers/category";

export default function SearchComponent({ navigation }) {
  // const actionName = useSelector((state) => state.name);
  const [searchText, setSearchText] = useState("");
  const [action, setAction] = useState(null);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.value);

  const handleResearch = () => {
    dispatch(
      addCategoryToStore({
        nameCategory: "Votre Recherche",
        keyword: searchText,
      })
    );
    navigation.navigate("Action");
    setSearchText("");
  };
  // console.log(searchText);
  // fetch(`${config.IP_ADDRESS}/activities/activityName/${searchText}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data) {
  //     }
  //     console.log("prout :", data);
  //   })

  useEffect(() => {}, []);

  const getSuggestions = async (q) => {
    const filterAction = q.toLowerCase();
    // console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setSelectedAction(null);
      return;
    }

    const suggestions = action
      .filter((item) => item.action.toLowerCase().includes(filterAction))
      .map((item) => ({
        id: item._id,
        title: item.name,
      }));
  };
  const handleSubmit = () => {};

  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Rechercher</Text>
          <AutocompleteDropdown
            direction={Platform.select({ ios: "down" })}
            onChangeText={(value) => setSearchText(value)}
            value={searchText}
            inputContainerStyle={styles.inputSearch}
            textInputProps={{
              placeholder: "Activités écologiques...",
            }}
          />
        </View>
        {/* bouton de recherche */}
        <TouchableOpacity>
          <View style={styles.btnContainer}>
            <ShortButton
              color={"#41F67F"}
              icon={faMagnifyingGlass}
              startColor={"#085229"}
              onPress={handleResearch}
              debounce={600}
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </AutocompleteDropdownContextProvider>
  );
}

// style={styles.viewInput}
const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    // marginLeft: 60,
    // justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  labelContainer: {
    flexDirection: "column",
    width: 290,
    height: 80,
    justifyContent: "center",
    // backgroundColor: "red"
  },
  btnContainer: {
    height: 100,
    justifyContent: "center",
    marginTop: 10,
    // backgroundColor: "blue"
  },

  inputSearch: {
    width: 260,
    height: 51,
    borderWidth: 1,
    borderColor: "#41F67F",
    borderRadius: 10,
  },

  label: {
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 12,
  },
  autocompleteContainer: {
    position: "relative",
    zIndex: 1,
  },
  listHeader: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
  },
  listItemText: {
    color: "#000",
    fontSize: 16,
  },
});

