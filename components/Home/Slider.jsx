import { View, Text, FlatList , Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import {db} from './../../config/firebaseConfig'
import {rS, rV, rmS} from './../../styles/responsive'
import { Colors } from '../../constants/Colors'


export default function Slider() {

    const[sliderList, setSliderList]=useState([]);

    useEffect(()=>{
        getlist();
    },[]);

    const getlist= async()=>{
        setSliderList([]);
        const q=query(collection(db, 'sliders'));
        const qurySnapShot=await getDocs(q);

        qurySnapShot.forEach((doc)=>{
            // console.log(doc.data());
            setSliderList(prev=>[...prev, doc.data()]);
        })
    }
  return (
    <View>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:rmS(17),
        padding:rmS(17),
        paddingBottom:rmS(8)
      }}>
        Special for you!
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:rmS(17) }}
        renderItem={({item, index})=>(
            
           <Image source={{uri:item.imageUrl}}
           style={{
            width:rS(200),
            height:rV(130),
            borderRadius:rmS(17),
            marginRight:rmS(17),
           }}
           />
           
        )}/>
    </View>
  )
}