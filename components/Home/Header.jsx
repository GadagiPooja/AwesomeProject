import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { rmS, rS, rV } from '../../styles/responsive';

export default function Header() {
    const { user } = useUser();
  return (
    <View
    style={{
        padding: rmS(17),
        paddingTop: rmS(27),
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius:rmS(20),
        borderBottomRightRadius:rmS(20),
    }}>

    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: rmS(10)
    }}>
        <Image source={{ uri: user?.imageUrl }}
            style={{
                width: rS(45), height: rV(45), borderRadius: rmS(99)
            }}
        />

        <View>
            <Text style={{
                fontFamily: 'outfit',
                color: 'black'
            }}>Welcome</Text>
            <Text style={{
                fontSize: rmS(19),
                fontFamily: 'outfit-medium',
                color: 'black'
            }}>{user?.fullName}</Text>
        </View>
    </View>
    {/* searchBar */}
    <View style={{
        display:'flex',
        flexDirection:'row',
        gap:rmS(10),
        alignItems:'center',
        backgroundColor:'#fff',
        padding:rmS(10),
        marginVertical:rmS(10),
        marginTop:rmS(15),
        borderRadius:rmS(100)
    }}>
        <Ionicons name="search" size={24} color={Colors.BLACK} />
        <TextInput placeholder='Search'style={{
            fontFamily:'outfit',
            fontSize:rmS(17),
            width:rS(100)
        }}>

        </TextInput>
    </View>
</View>

  )
}