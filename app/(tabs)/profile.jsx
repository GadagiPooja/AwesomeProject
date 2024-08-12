import { View, Text } from 'react-native'
import React from 'react'
import { rV, rmS } from './../../styles/responsive'

import UserIntro from '../../components/Profile/UserIntro'
import Menu from '../../components/Profile/Menu'


export default function profile() {
  return (
    <View style={{
      padding:rmS(20)
    }}>
      <Text
      style={{
        fontFamily:'outfit-bold',
        fontSize:rmS(20)
      }}>profile</Text>

      <UserIntro/>

      <Menu/>
    </View>


  )
}