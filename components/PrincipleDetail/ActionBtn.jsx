import { View, Text, Image, TouchableOpacity, StyleSheet, Share } from 'react-native';
import React from 'react';
import { rS, rV, rmS } from '../../styles/responsive';
import { Colors } from '../../constants/Colors';
import * as Linking from 'expo-linking'; // Import Linking from Expo

export default function ActionBtn({ princi }) {
    const actionMenu = [
        {
            id: 1,
            name: 'Web',
            icon: require('./../../assets/images/web.png'),
            url: princi?.website || 'https://expo.dev' // Default URL if princi.website is undefined
        },
        {
            id: 2,
            name: 'Share',
            icon: require('./../../assets/images/share.png'),
            url: '' // Placeholder, adjust as needed
        },
    ];

    const onPressHandle = (item) => {
        if (item.name === 'Share') {
            Share.share({ message: 'Download the Task Manager App By Pooja Gadagi' });
      return;
        }
        if (item.url) {
            Linking.openURL(item.url);
        } else {
            console.warn(`No URL found for ${item.name}`);
        }
    };

    return (
        <View style={styles.container}>
            {actionMenu.map((item) => (
                <TouchableOpacity key={item.id} style={styles.button} onPress={() => onPressHandle(item)}>
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: rmS(20),
        marginTop: rmS(20),
        
    },
    button: {
        alignItems: 'center',
    },
    icon: {
        width: rS(40),
        height: rV(40),
        marginBottom: rmS(5),fontFamily:'outfit-medium'
    },
    text: {
        fontSize: rmS(14),
        fontFamily: 'outfit-medium',
        color: Colors.PRIMARY,
    },
});
