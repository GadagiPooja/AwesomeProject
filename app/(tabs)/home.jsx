import { View, FlatList } from 'react-native'
import React from 'react'
import { rV, rmS } from './../../styles/responsive'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import Discussion from '../../components/Home/Discussion'

const SECTIONS = [
  { key: 'header', component: <Header /> },
  { key: 'slider', component: <Slider /> },
  { key: 'category', component: <Category /> },
  { key: 'discussion', component: <Discussion /> }
]

export default function Home() {
  return (
    <View>
      <FlatList
        data={SECTIONS}
        renderItem={({ item }) => <View style={{ marginBottom: rmS(10) }}>{item.component}</View>}
        keyExtractor={item => item.key}
      />

      <View style={{
        height:150
      }}>

      </View>

    </View>
  )
}
