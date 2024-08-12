import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import {rV, rS, rmS} from '../../styles/responsive'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors';
import Category from '../../components/Home/Category'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import ExplorePrinciples from '../../components/Explore/ExplorePrinciples';

export default function explore() {
      const [princiList, setPriciList] = useState([]);

  const getPrincipleByCategory= async(Principle)=>{
      setPriciList([]);
    const q = query(collection(db, 'Discussion'), where('Category', '==', Principle));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setPriciList(prev => [...prev, {id:doc.id, ...doc.data()}]);
    })

  }
  return (
    <View style={{
      padding:rmS(20)
    }}>
      <Text
      style={{
        fontSize:rmS(20),
        fontFamily:'outfit-bold'
      }}>Explore More </Text>


      {/* searchbar */}
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:rmS(10),
        alignItems:'center',
        backgroundColor:'#fff',
        padding:rmS(10),
        marginVertical:rmS(10),
        marginTop:rmS(15),
        borderRadius:rmS(100),
        borderWidth:rmS(1),
        borderColor:Colors.PRIMARY
    }}>
        <Ionicons name="search" size={24} color={Colors.BLACK} />
        <TextInput placeholder='Search'style={{
            fontFamily:'outfit',
            fontSize:rmS(17),
            width:rS(100)
        }}>

        </TextInput>
    </View> 

      {/* category */}
      <Category 
      explore={true}
      onCategorySelect={(Category)=>getPrincipleByCategory(Category)}
      
      />

      {/* principllist */}
      <ExplorePrinciples princiList={princiList} />


    </View>
  )
}