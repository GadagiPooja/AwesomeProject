import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { rS, rV, rmS } from '../../styles/responsive'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PrincipleListCard({principle}) {
  const router= useRouter();

  return (
    <TouchableOpacity style={{
        padding:rmS(10),
        margin:rmS(10),
        borderRadius:rmS(15),
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        gap:rmS(10),
        alignItems:'center'
    }}
    onPress={()=>router.push('/PrincipleDetail/'+principle.id)}
    >
      <Image source={{uri:principle.imageUrl}}
      style={{
        width:rS(100),
        height:rV(100),
        borderRadius:rmS(15)
      }}
      />
      <View>
        <Text style={{fontSize:rmS(18), fontFamily:'outfit-bold'
        }}>{principle.name}</Text>
        <View style={{display:'flex', flexDirection:'row', gap:5}}>
                <Image source={require('./../../assets/images/favourites.png')}
                style={{
                    width:rS(15),
                    height:rV(15)
                }}></Image>
                <Text style={{fontFamily:'outfit', color:Colors.GREY}}>4.5</Text>
              </View>
      </View>
    </TouchableOpacity>
  )
}