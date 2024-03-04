import { View, Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { iconName } from '@fortawesome/free-solid-svg-icons/faMugSaucer';

export default function activityCard({ onPress, startColor, color, text, icon }) {
  return (
   <>
      <Shadow distance={0.5} startColor={startColor} offset={[4, 5]}>
         <TouchableOpacity
            style={
               { 
                  backgroundColor: "white",
                  width: 264,
                  height: 200,
                  padding: 10,
                  borderRadius: 12,
                  justifyContent: 'center',
               }
               }
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
            {/* <FontAwesomeIcon icon={iconName} size={size} color={color}/> */}
            <FontAwesomeIcon 
               style={{ textAlign: 'center'}} 
               icon={icon} size={120} color={color} />
               {/* icon={`fa${icon}`} size={120} color={color} /> */}
         </TouchableOpacity>
      </Shadow>
   </>
  )
}
// <FontAwesomeIcon icon="mug-saucer" />