import { View, Text, TextInput, Button, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { rmS } from '../../styles/responsive';
import { Colors } from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from './../../config/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore'; 

export default function AddTask() {
  const navigation = useNavigation();

  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [remarks, setRemarks] = useState('');
  const [priority, setPriority] = useState('Select');
  const [category, setCategory] = useState('Select');
  const [reminder, setReminder] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Task',
      headerShown: true,
    });
  }, []);

  const handleAddTask = async () => {
    // Validate inputs
    if (!taskName.trim()) {
      alert( 'Task Name is required.');
      return;
    }
    
    if(!deadline || !remarks) alert('Fill All  details')
    
if (priority === 'Select') {
      alert( 'Please select a priority.');
      return;
    }
    if (category === 'Select') {
      alert( 'Please select a category.');
      return;
    }
    // Handle task addition logic here
    console.log('Task Name:', taskName);
    console.log('Deadline:', deadline);
    console.log('Remarks:', remarks);
    console.log('Priority:', priority);
    console.log('Category:', category);
    console.log('Reminder:', reminder);

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        taskName: taskName,       // String
      deadline: deadline,       // Date (Firestore automatically handles Date objects)
      remarks: remarks,         // String
      priority: priority,       // String
      category: category,       // String
      reminder: reminder,       // Boolean
      });
      console.log("Document written with ID: ", docRef.id);
      // Optionally reset the form after adding the task
      handleReset();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleReset = () => {
    setTaskName('');
    setDeadline(new Date());
    setRemarks('');
    setPriority('Select');
    setCategory('Select');
    setReminder(false);
    setShowDatePicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: rmS(20) }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: rmS(24), color: Colors.PRIMARY, textAlign: 'center' }}>
          Add Task
        </Text>
        <Text style={{ fontFamily: 'outfit', color: Colors.GREY, marginBottom: rmS(20), textAlign: 'center' }}>
          Fill all details
        </Text>

        <View style={{ marginBottom: rmS(15) }}>
          <Text style={{ fontFamily: 'outfit', fontSize: rmS(16) }}>
            Task Name
          </Text>
          <View style={{
            borderColor: Colors.GREY,
            borderRadius: 10,
            paddingVertical: rmS(8),
            paddingHorizontal: rmS(15),
            backgroundColor: Colors.WHITE,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 3,
          }}>
            <TextInput
              placeholder='Task Name'
              value={taskName}
              onChangeText={setTaskName}
              style={{
                fontFamily: 'outfit',
                fontSize: rmS(16),
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: rmS(15) }}>
          <Text style={{ fontFamily: 'outfit', fontSize: rmS(16), marginBottom: rmS(5) }}>
            Deadline
          </Text>
          <View style={{
            borderColor: Colors.GREY,
            borderRadius: 10,
            paddingVertical: rmS(8),
            paddingHorizontal: rmS(15),
            backgroundColor: Colors.WHITE,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 3,
          }}>
            <TextInput
              placeholder='Select Deadline'
              value={deadline.toLocaleDateString()}
              onFocus={() => setShowDatePicker(true)}
              style={{
                fontFamily: 'outfit',
                fontSize: rmS(16),
              }}
            />
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={deadline}
              mode='date'
              display='default'
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={{ marginBottom: rmS(10) }}>
          <Text style={{ fontFamily: 'outfit', fontSize: rmS(16) }}>
            Remarks
          </Text>
          <View style={{
            borderColor: Colors.GREY,
            borderRadius: 10,
            paddingVertical: rmS(8),
            paddingHorizontal: rmS(15),
            backgroundColor: Colors.WHITE,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 3,
          }}>
            <TextInput
              placeholder='Remarks'
              value={remarks}
              onChangeText={setRemarks}
              multiline
              style={{
                fontFamily: 'outfit',
                fontSize: rmS(16),
                textAlignVertical: 'top',
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: rmS(15) }}>
          <Text style={{ fontFamily: 'outfit', fontSize: rmS(16), marginBottom: rmS(5) }}>
            Priority
          </Text>
          <View style={{
            borderColor: Colors.GREY,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: Colors.WHITE,
            height: rmS(47),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 3,
          }}>
            <Picker
              selectedValue={priority}
              onValueChange={(itemValue) => setPriority(itemValue)}
              style={{ fontFamily: 'outfit-bold', fontSize: rmS(16), color: Colors.BLACK }}
            >
              <Picker.Item label="Select" value="item1" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Low" value="Low" />
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: rmS(15) }}>
          <Text style={{ fontFamily: 'outfit', fontSize: rmS(16), marginBottom: rmS(5) }}>
            Category
          </Text>
          <View style={{
            borderColor: Colors.GREY,
            borderRadius: 10,
            overflow: 'hidden',
            height: rmS(47),
            backgroundColor: Colors.WHITE,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 3,
          }}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={{ fontFamily: 'outfit', fontSize: rmS(16), color: Colors.BLACK }}
            >
              <Picker.Item label="Select" value="item2" />
              <Picker.Item label="Work" value="Work" />
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Shopping" value="Shopping" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rmS(15) }}>
          <Text style={{ fontFamily: 'outfit-medium', fontSize: rmS(16), marginRight: rmS(10) }}>
            Set Reminder
          </Text>
          <Switch
            value={reminder}
            onValueChange={setReminder}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title='Add Task' onPress={handleAddTask} color={Colors.PRIMARY} />
          <Button title='Reset' onPress={handleReset} color={Colors.BLACK} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
