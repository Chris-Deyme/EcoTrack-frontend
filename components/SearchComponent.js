import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchComponent() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
      }}
    >
      <View style={styles.inputContainer}>
        <Text style={{ marginLeft: 10 }}>Rechercher</Text>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity style={{}}>
        <FontAwesome
          name="search"
          size={34}
          color="#085229"
          style={{ paddingTop: 43 }}
        />
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
    //  width: "100%",
    height: 51,
    borderWidth: 1,
    borderColor: "#085229",
    borderRadius: 10,
    paddingLeft: 10,
  },
});
