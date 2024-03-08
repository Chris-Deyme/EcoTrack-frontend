import { View, Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ShortButton({ onPress, icon, color }) {
   return (
      <>
         <Shadow distance={0.5} startColor={'#000000FF'} offset={[4, 5]}>
            <TouchableOpacity
            style={
               { 
                  backgroundColor: color,
                  width: 51,
                  height: 51,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: color,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
               }
               } 
               onPress={onPress}
            >
               <FontAwesomeIcon icon={icon} size={27} color={"black"} />
            </TouchableOpacity>
         </Shadow>
      </>
  );
}
