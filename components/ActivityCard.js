import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function activityCard({ onPress, startColor, color, text, icon, borderColor, source }) {
  return (
   <>
      <Shadow distance={0.5} startColor={startColor} offset={[4, 5]}>
         <TouchableOpacity
            style={
               { 
                  backgroundColor: "white",
                  width: 360,
                  height: 200,
                  padding: 10,
                  borderRadius: 12,
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: color
               }
               }
               onPress={onPress}
         >
            <Text style={{ 
               fontSize: 24,
               fontWeight: "bold",
               alignItems: 'flex-start',
               marginBottom: 20,
               marginTop: 10,
             }}
            >
               {text}
            </Text>
            {/* <Image 
               source={source}  
               style={{width: 300, height: 130 }}/> */}
            <FontAwesomeIcon 
               style={styles.icon} 
               icon={icon} size={120} color={color} />
         </TouchableOpacity>
      </Shadow>
   </>
  )
}

// style={styles.card}
const styles = StyleSheet.create({
   icon: {
      marginLeft: "33%",
      marginBottom: 30,
   },
   gif: {

   }
});