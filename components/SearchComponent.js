import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import ShortButton from "./ShortButton";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

export default function SearchComponent() {


  return (
    <View style={{
            width: "100%",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
    >
      <View style={styles.inputContainer}>
        <Text style={{ marginLeft: 10 }}>Rechercher</Text>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity>
        <View style={{ display: "flex" }}>
          <ShortButton
            color={"#41F67F"}
            icon={faMagnifyingGlass}
            startColor={"#085229"}
            onPress={() => {}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

// style={styles.viewInput}
const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    marginTop: 20,
  },
  input: {
    width: 250,
    height: 51,
    borderWidth: 1,
    borderColor: "#085229",
    borderRadius: 10,
    paddingLeft: 10,
  },
});
