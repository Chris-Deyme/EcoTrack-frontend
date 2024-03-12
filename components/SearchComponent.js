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

export default function SearchComponent() {
  // const actionName = useSelector((state) => state.name);
  const [searchText, setSearchText] = useState("");
  const [action, setAction] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleResearch = () => {
    console.log(searchText);
    fetch(`${config.IP_ADDRESS}/activities/activityName/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
        }
        console.log("prout :", data);
      })
      .catch((error) => {
        console.error("Erreur, ta mère en fetch !!!", error);
      });
  };
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
        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Rechercher</Text>
            <AutocompleteDropdown
              direction={Platform.select({ ios: "down" })}
              onChangeText={(value) => setSearchText(value)}
              value={searchText}
            />
          </View>
        </View>
        {/* bouton de recherche */}
        <TouchableOpacity >
          <View style={{ display: "flex" }}>
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
    // gap: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  inputContainer: {
    marginTop: 0,
    marginBottom: 10,
    alignItems: "center",
  },

  label: {
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 51,
    borderWidth: 1,
    borderColor: "#085229",
    borderRadius: 12,
    // paddingLeft: 10,
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

// <View
//   style={{
//     width: "100%",
//     flexDirection: "row",
//     gap: 10,
//     justifyContent: "center",
//     alignItems: "flex-end",
//   }}
// >
//   <View style={styles.inputContainer}>
//     <Text style={{ marginLeft: 10 }}>Rechercher</Text>
//     <TextInput style={styles.input} />
//   </View>
//   <TouchableOpacity>
//     <View style={{ display: "flex" }}>
//       <ShortButton
//         color={"#41F67F"}
//         icon={faMagnifyingGlass}
//         startColor={"#085229"}
//         onPress={() => {}}
//       />
//     </View>
//   </TouchableOpacity>
// </View>
