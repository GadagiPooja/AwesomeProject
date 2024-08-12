import { View, Text , Image} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { rV, rmS, rS } from './../../styles/responsive'



export default function UserIntro() {

    const {user}= useUser();
  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:rmS(25)
    }}>
      <Image source={{ uri: user?.imageUrl }}
            style={{
                width: rS(100), height: rV(100), borderRadius: rmS(99)
            }}
        />
        <Text style={{
        fontFamily:'outfit-bold',
        fontSize:rmS(20)
      }}>{user?.fullName}</Text>
        <Text style={{
        fontFamily:'outfit',
        fontSize:rmS(20)
      }}>{user?.primaryEmailAddressId?.emailAddress}</Text>

    </View>
  )
}