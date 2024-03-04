import { View, Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CardActivity({ startColor, color, text, name }) {
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
            <FontAwesome 
               style={{ textAlign: 'center'}} 
               name={name} size={120} color={color} />
            {/* <Text style={{fontSize: 120, textAlign: 'center'}}>🚴‍♀️</Text> */}

         </TouchableOpacity>
      </Shadow>
   </>
  )
}
