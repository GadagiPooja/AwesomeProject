import { View, Text, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from './../../config/firebaseConfig'
import CategoryItem from './CategoryItem'
import { rmS } from '../../styles/responsive';
import {useRouter} from 'expo-router';



export default function Category({explore=false, onCategorySelect}) {

  const [categoryList, setCtegoryList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetCategoryList();
  }, []);
  const GetCategoryList = async () => {
    setCtegoryList([]);
    const q = query(collection(db, 'Category'));

    const qurySnapShot = await getDocs(q);

    qurySnapShot.forEach((doc) => {
      // console.log(doc.data());
      setCtegoryList(prev => [...prev, doc.data()]);
    })
  }

  const onCategoryPressHandler=( item)=>{
    if(!explore){
      router.push('/PrinciplesList/'+item.name)
    }
    else {
      onCategorySelect(item.name)
    }
  }
  return (

    <View>
     {!explore && <View style={{
        padding: rmS(15),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Text
          style={{

            fontSize: rmS(17),
            fontFamily: 'outfit-bold',

          }}>Key Principles

        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-bold'
          }}>View All</Text>
      </View>}

      <FlatList
        horizontal={true}
        style={{marginLeft:rmS(20)}}
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          
          <View>
            <CategoryItem category={item} key={index}
            onCategoryPress={(category)=>onCategoryPressHandler(item)}/>
            </View>
        )}
      />
    </View>
  )
}

