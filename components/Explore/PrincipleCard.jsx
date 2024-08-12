import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { rV, rmS } from '../../styles/responsive';
import { useRouter } from 'expo-router';

export default function PrincipleCard({ principle }) {

    const router=useRouter()
  return (
    <TouchableOpacity 
    onPress={()=>router.push('/PrincipleDetail/'+principle?.id)}
    style={{
      backgroundColor: '#fff',
      borderRadius: rmS(15),
      overflow: 'hidden',
      margin: rmS(10),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }}>
      <Image 
        source={{ uri: principle.imageUrl }} 
        style={{
          width: '100%',
          height: rV(150),
          borderTopLeftRadius: rmS(15),
          borderTopRightRadius: rmS(15),
        }} 
      />
      <View style={{
        padding: rmS(15),
      }}>
        <Text style={{  
          fontFamily: 'outfit-bold',
          fontSize: rmS(20),
          marginBottom: rmS(5)
        }}>
          {principle.name}
        </Text>
        <Text style={{  
          fontFamily: 'outfit',
          fontSize: rmS(16),
          color: '#555'
        }}>
          {principle.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
