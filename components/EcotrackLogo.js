import React from 'react';
import {StyleSheet, View, Text, Image } from 'react-native';

export default function EcotrackLogo() {
   return (
      <>
         <Image
            source={require("../assets/Ecotrack-logo.png")}
            style={{
               width: 250,
               height: 250,
            }}
         />
         <Text 
            style={{
               fontSize: 36,
               textAlign: "center",
               fontWeight: "700",
            }} 
         >
            ECOTRACK
         </Text>
      </>
   )
}


