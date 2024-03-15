import { TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function ShortButton({ onPress, icon, color, startColor }) {
   return (
      <>
         <Shadow distance={0.5} startColor="black" offset={[4, 5]}>
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
