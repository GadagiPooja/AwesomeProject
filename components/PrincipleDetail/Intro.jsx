import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { rS, rV, rmS } from '../../styles/responsive'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Intro({ princi }) {

    const router=useRouter();
  return (
    <View>
      <View style={{ position:'absolute', zIndex:10 , display:'flex', flexDirection:'row', justifyContent:'space-between'
        , width:'100%', padding:rmS(30)
      }}>
        <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back-circle" size={30} color={"black"} />
        </TouchableOpacity>
        <Ionicons name="heart-circle-outline" size={30} color="black" />
      </View>
      <Image 
        source={{ uri: princi.imageUrl }}
        style={{
          width: '100%',
          height: rV(300)
        }}
      />

      <View style={{
        padding:rmS(20),
        marginTop:rmS(-20),
        borderRadius:rmS(20)
      }}>
       
      </View>
    </View>
  )
}
