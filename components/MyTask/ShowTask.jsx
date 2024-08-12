import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../config/firebaseConfig';
import { rmS } from '../../styles/responsive';

export default function ShowTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const q = query(collection(db, 'tasks'));
      const querySnapshot = await getDocs(q);

      const fetchedTasks = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const deadline = data.deadline && data.deadline.toDate ? data.deadline.toDate() : null;

        fetchedTasks.push({
          id: doc.id,
          ...data,
          deadline: deadline.toDate(),
        });
      });
      console.log(fetchedTasks)
      setTasks(fetchedTasks);
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No tasks found.</Text>
        </View>
      ) : (
        <FlatList
          horizontal={true}
          style={{ marginLeft: rmS(20) }}
          data={tasks}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskName}>Task:{item.taskName}</Text>
              <Text style={styles.tableCell}>Deadline: {item.deadline}</Text>
              <Text>Remarks: {item.remarks}</Text>
              <Text>Priority: {item.priority}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Reminder: {item.reminder ? 'Yes' : 'No'}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableCell: {
    textAlign: 'center',
    marginTop: 5,
  },
});
