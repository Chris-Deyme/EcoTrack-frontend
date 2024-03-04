import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ActionCard({ startColor, color, name }) {
  return (
   <>
   <View style={styles.card}>
      <View style={styles.shadow}>
         <Shadow distance={0.5} startColor={startColor} offset={[4, 5]}>
            <TouchableOpacity
               style={
                  { 
                     backgroundColor: "white",
                     width: 103,
                     height: 103,
                     padding: 10,
                     borderRadius: 12,
                     justifyContent: 'center',
                  }
               }
            >
               <FontAwesome 
                  style={{ textAlign: 'center'}} 
                  name={name} size={48} color={color} />
               {/* <Text style={{fontSize: 120, textAlign: 'center'}}>🚴‍♀️</Text> */}
            </TouchableOpacity>
         </Shadow>
      </View>
      <View style={styles.textContainer}>
         <Text style={styles.title}>Déplacement à vélo</Text>
         <Text style={styles.number}>250</Text>
      </View>
   </View>
   </>
  )
}

// style={styles.textContainer}
const styles = StyleSheet.create({
	card: {
      width: 300,
      height:110,
	   alignItems: 'center',
	   justifyContent: 'space-around',
      borderWidth: 1,
      borderColor: "#41F67F",
      flexDirection: "row",
	},
	title: {
      marginLeft: 35,
      marginBottom: 30,
		fontSize: 16,
      fontWeight: "bold",
	},
	number: {
		fontSize: 16
	},
   textContainer:{
      width: 180,

   },
})