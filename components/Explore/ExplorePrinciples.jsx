import { View, FlatList } from 'react-native';
import React from 'react';
import PrincipleCard from './PrincipleCard';
import { rmS } from '../../styles/responsive';

export default function ExplorePrinciples({ princiList }) {
  return (
    <FlatList
      data={princiList}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ marginBottom: rmS(10) }}>
          <PrincipleCard principle={item} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: rmS(20) }}
      ListFooterComponent={<View style={{ height: rmS(200) }} />}
    />
  );
}
