import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';


export default function _layout() {
    return (
        <Tabs screenOptions={{
         headerShown:false,
         tabBarActiveTintColor:Colors.PRIMARY
        }}>
             <Tabs.Screen name='home'
             options={{
                 tabBarLabel:"Home",
                 tabBarIcon:({color})=><Ionicons name="home" 
                 size={24} color={color} />
             }}
             />
             <Tabs.Screen name='Explore'
              options={{
                 tabBarLabel:"Explore",
                 tabBarIcon:({color})=><Ionicons name="search-circle" 
                 size={24} color={color} />
             }}/>
             <Tabs.Screen name='newTask'
              options={{
                 tabBarLabel:"Task",
                 tabBarIcon:({color})=><FontAwesome5 name="tasks" size={24} color={color} />
             }}/>
             <Tabs.Screen name='profile'
              options={{
                 tabBarLabel:"Profile",
                 tabBarIcon:({color})=><Ionicons name="person" 
                 size={24} color={color} />
             }}/>
        </Tabs>
       )
}