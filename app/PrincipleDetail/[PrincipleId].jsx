import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/PrincipleDetail/Intro';
import ActionBtn from '../../components/PrincipleDetail/ActionBtn';

export default function PrincipleDetails() {
    const { PrincipleId } = useLocalSearchParams();
    const [principle, setPrinciple] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPrincipleDetailById();
    }, []);

    const getPrincipleDetailById = async () => {
        try {
            const docRef = doc(db, 'Discussion', PrincipleId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Data", docSnap.data());
                setPrinciple(docSnap.data());
            } else {
                console.log("No data");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            ) : principle ? (
                <ScrollView>
                    <Intro princi={principle} />
                    <ActionBtn princi={principle}/>
                    <View style={styles.entryContainer}>
                        <Text style={styles.entryKey}>Category</Text>
                        <Text style={styles.entryValue}>{principle.Category}</Text>
                    </View>
                    <View style={styles.entryContainer}>
                        <Text style={styles.entryKey}>Name</Text>
                        <Text style={styles.entryValue}>{principle.name}</Text>
                    </View>
                    <View style={styles.entryContainer}>
                        <Text style={styles.entryKey}>About</Text>
                        <Text style={styles.entryValue}>{principle.about}</Text>
                    </View>
                </ScrollView>
            ) : (
                <Text>No Data Found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Light background color
    },
    entryContainer: {
        marginVertical: 5,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    entryKey: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.PRIMARY,
        fontFamily:'outfit-medium'
    },
    entryValue: {
        fontSize: 14,
        color: '#333',
        fontFamily:'outfit'
    },
});
