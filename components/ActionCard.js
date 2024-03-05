import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function ActionCard({ startColor, color, icon, borderColor }) {
  return (
   <>
   <View style={styles.card}>
      {/* <View style={styles.shadow}> */}
      <View>
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
                     borderWidth: 2,
                     borderColor: color
                  }
               }
            >
            <View style={styles.iconContainer}>
               <FontAwesomeIcon 
                  icon={icon} size={48} color={color} 
               />
            </View>

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

// style={styles.iconContainer}
const styles = StyleSheet.create({
	card: {
      width: 300,
      height:110,
	   alignItems: 'center',
	   justifyContent: 'space-around',
      flexDirection: "row",
	},
	title: {
      marginLeft: 15,
      marginBottom: 30,
		fontSize: 16,
      fontWeight: "bold",
	},
	number: {
		fontSize: 16,
      marginLeft: 15,
	},
   textContainer:{
      width: 180,
   },
   iconContainer: {
      display: "flex",
   	alignItems: 'center',
	   justifyContent: 'center',
      
   },
   border: {
      borderWidth: 2,

   }
})