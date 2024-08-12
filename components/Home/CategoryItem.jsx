import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { rS, rV, rmS } from '../../styles/responsive'

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)} style={{ alignItems: 'center', marginBottom: rmS(10) }}>
      <View style={{
        padding: 5,
        backgroundColor: Colors.PRIMARY,
        borderRadius: rmS(99),
        marginRight: rmS(10),
        alignItems: 'center'
      }}>
        <Image source={{ uri: category.icon }}
          style={{
            width: rS(45),
            height: rV(45)
          }}
        />
      </View>
      <Text style={{
        fontSize: rmS(8),
        fontFamily: 'outfit',
        width: rS(60), // Adjust the width as necessary
        textAlign: 'center',
        lineHeight: rmS(10), // Adjust as necessary for readability
      }}>
        {category.name}
      </Text>
    </TouchableOpacity>
  )
}
