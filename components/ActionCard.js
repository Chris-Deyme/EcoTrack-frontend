import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ActionCard({
  startColor,
  color,
  icon,
  text,
  points,
  number,
}) {
  return (
    <>
      <View style={styles.card}>
        {/* <View style={styles.shadow}> */}
        <View>
          <Shadow distance={0.5} startColor={startColor} offset={[4, 5]}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 103,
                height: 103,
                padding: 10,
                borderRadius: 12,
                justifyContent: "center",
                borderWidth: 2,
                borderColor: color,
              }}
            >
              <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={icon} size={48} color={color} />
              </View>
            </TouchableOpacity>
          </Shadow>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleAndScore}>
            <Text style={styles.title}>{text}</Text>
            <Text style={styles.score}>{points}</Text>
          </View>
          <Text style={styles.number}>
            {number}kg Co<Text style={styles.subscript}>2</Text>
          </Text>
        </View>
      </View>
    </>
  );
}

// style={styles.iconContainer}
const styles = StyleSheet.create({
  card: {
    width: "80%",
    height: 110,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  number: {
    fontSize: 15,
    marginLeft: 15,
    color: "#000000",
  },
  score: {
    fontSize: 15,
    marginLeft: 15,
  },
  textContainer: {
    width: 180,
    height: "100%",
    justifyContent: "space-around"
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    borderWidth: 2,
  },
  subscript: {
    fontSize: 10,
    textAlignVertical: "bottom",
  },
});
