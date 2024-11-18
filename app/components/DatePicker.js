import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import { Ionicons } from '@expo/vector-icons';

const DatePickerField = ({ label, onDateChange }) => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleConfirm = (selectedDate) => {
    setOpen(false);
    setDate(selectedDate);
    if (onDateChange) onDateChange(selectedDate);
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text>{date ? date.toLocaleDateString() : label}</Text>
        <Ionicons name="calendar-outline" size={24} color="#666" />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />

      {/* <Button title="Pick Date" onPress={() => setOpen(true)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 0,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    paddingVertical: 12,
    justifyContent: 'space-between',  // changed from center
    flexDirection: 'row',  // added for icon alignment
    alignItems: 'center',  // added for vertical centering
  },
});

export default DatePickerField;
