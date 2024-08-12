import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { rS, rV, rmS } from '../../styles/responsive'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './../../config/firebaseConfig'

export default function Discussion() {
  const [discussionList, setdiscussionList] = useState([]);

  useEffect(() => {
    GetDiscussionList();
  }, []);

  const GetDiscussionList = async () => {
    setdiscussionList([]);
    const q = query(collection(db, 'Discussion'), limit(10));
    const qurySnapShot = await getDocs(q);

    qurySnapShot.forEach((doc) => {
      setdiscussionList(prev => [...prev, doc.data()]);
    });
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discussion</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>

      <FlatList
        data={discussionList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View >
              <Text style={styles.text}>{item.name}</Text>
              <View style={{display:'flex',flexDirection:'row',  justifyContent:'space-between'}}>
              <Text style={{
                fontFamily:'outfit',
                color:Colors.GREY
              }}>{item.Category}</Text>

              <View style={{display:'flex', flexDirection:'row', gap:5}}>
                <Image source={require('./../../assets/images/favourites.png')}
                style={{
                    width:rS(15),
                    height:rV(15)
                }}></Image>
                <Text style={{fontFamily:'outfit', color:Colors.GREY}}>4.5</Text>
              </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: rmS(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: rmS(17),
    fontFamily: 'outfit-bold',
  },
  viewAll: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-bold',
  },
  card: {
    marginLeft: rmS(20),
    backgroundColor: Colors.LIGHT,
    borderRadius: rmS(17),
    padding: rmS(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: rS(200),
    height: rV(150),
    borderRadius: rmS(17),
    marginBottom: rmS(10),
  },
 
  text: {
    fontFamily: 'outfit-medium',
    fontSize: rmS(15),
  },
});
