import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

export default function ActionCard({
  startColor,
  color,
  icon,
  text,
  points,
  number,
  textColor
}) {
  return (
    <View style={styles.card}>
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
      <View style={styles.textContainer}>
        <View style={styles.titleAndScore}>
          <Text style={styles.title}>{text}</Text>
          <Text style={styles.score}>Points rapportés : {points}</Text>
        </View>
        <Text style={[styles.number, { color: textColor }]} >
          <FontAwesomeIcon icon={faSeedling} size={14} color={color} /> {number}kg de Co<Text style={[styles.subscript, { color: textColor }]} >2</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "80%",
    height: 110,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  number: {
    fontSize: 14,
    marginLeft: 5,
  },
  score: {
    fontSize: 13,
    marginLeft: 5,
    fontStyle: "italic"
  },
  textContainer: {
    width: 180,
    height: "100%",
    justifyContent: "space-around",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subscript: {
    fontSize: 10,
    fontWeight: "bold",
    textAlignVertical: "bottom",
  },
  titleAndScore: {
    gap: 3,
  }
});
