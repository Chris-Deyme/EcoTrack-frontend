import { Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';

export default function LongButton({ onPress, text, color }) {
   return (
      <>
         <Shadow distance={0.5} startColor={'black'} offset={[4, 5]}>
            <TouchableOpacity
            style={
               { 
                  backgroundColor: color,
                  width: 288,
                  height: 51,
                  padding: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: "#41F67F",
               }
               } 
               onPress={onPress}
            >
               <Text 
                  style={
                     {
                        color: "#000", 
                        fontSize: 20, 
                        textAlign: "center"
                     }
                  }>
                  {text}
               </Text>
            </TouchableOpacity>
         </Shadow>
      </>
  );
}