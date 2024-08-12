import { View, Text, FlatList, Image, Share, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { rS, rV, rmS } from '../../styles/responsive';
import { Colors } from '../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Menu() {
  const { signOut } = useAuth();
  const router = useRouter();
  

  const list = [
    {
      id: 1,
      name: 'Add',
      icon: require('./../../assets/images/add.png'),
      path: '/Tasks/AddTask'  // Assuming you have a path for 'add'
    },
    {
      id: 2,
      name: 'My Task',
      icon: require('./../../assets/images/mytask.png'),
      path: '/(tabs)/newTask'  // Assuming you have a path for 'my-task'
    },
    {
      id: 3,
      name: 'Share',
      icon: require('./../../assets/images/share1.png'),
      path: 'share'
    },
    {
      id: 4,  // Changed id from 14 to 4 for consistency
      name: 'Log Out',
      icon: require('./../../assets/images/logout.png'),
      path: 'logout'
    }
  ];

  const onMenuClick = (item) => {
    if (item.path === 'logout') {
      signOut();
      return;
    }
    if (item.path === 'share') {
      Share.share({ message: 'Download the Task Manager App By Pooja Gadagi' });
      return;
    }
    router.push(item.path);
  };

  return (
    <View style={{ marginTop: rmS(30) }}>
      <FlatList
        data={list}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
                height:rV(70),
                width:rS(100),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: rmS(5),
              flex: 1,
              padding: rmS(10),
              borderWidth: rmS(2),
              margin: rmS(10),
              borderRadius: 10,
              borderColor: Colors.GREY,
              backgroundColor: '#fff',
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              shadowOffset: { width: 0, height: 2 },
            }}
            onPress={() => onMenuClick(item)}  // Corrected onPress prop
          >
            <Image
              source={item.icon}
              style={{
                width: rmS(50),
                height: rV(50),
              }}
            />
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: rmS(16),
                flex: 1,
                color: Colors.BLACK ,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}  // Added keyExtractor
      />

      <Text
        style={{
          fontFamily: 'outfit',
          textAlign: 'center',
          marginTop: rmS(100),
          color: Colors.PRIMARY,
        }}
      >
        Developed By Pooja Gadagi
      </Text>
    </View>
  );
}
