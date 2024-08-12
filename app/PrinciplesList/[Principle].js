import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import PrincipleListCard from '../../components/PrincipleList/PrincipleListCard';
import { Colors } from '../../constants/Colors';

export default function PrincipleListByPrinciples() {
    const navigation = useNavigation();
    const { Principle } = useLocalSearchParams();

    const [princiList, setPriciList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

    useEffect(() => {
        if (Principle) {
            navigation.setOptions({
                headerShown: true,
                headerTitle: Principle
            });
            getPrincipleList();
        }
    }, [Principle]);

    // Fetch principle list based on Principle parameter
    const getPrincipleList = async () => {
        setLoading(true);
        setPriciList([]); // Clear previous list
        try {
            const q = query(collection(db, 'Discussion'), where('Category', '==', Principle));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No matching documents.");
            } else {
                const tempList = [];
                querySnapshot.forEach((doc) => {
                    tempList.push({id:doc?.id, ...doc.data()});
                });
                setPriciList(tempList); // Set the fetched list
            }
        } catch (error) {
            console.error("Error getting documents: ", error);
        } finally {
            setLoading(false); // Always set loading state to false
            setRefreshing(false); // Set refreshing state to false after data fetch
        }
    };

    // Function to handle pull-to-refresh action
    const handleRefresh = () => {
        setRefreshing(true); // Set refreshing state to true
        getPrincipleList(); // Fetch data again
    };

    return (
        <View style={{ flex: 1 }}>
            {loading && princiList.length === 0 ? (
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            ) : (
                <FlatList
                    data={princiList}
                    renderItem={({ item, index }) => (
                        <PrincipleListCard
                            principle={item}
                            key={index}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text>No Match Found</Text>} // Rendered when data array is empty
                    refreshControl={ // Refresh control for pull-to-refresh functionality
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={[Colors.PRIMARY]} // Customize the refresh indicator color
                        />
                    }
                />
            )}
        </View>
    )
}
