import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';

const DatePickerField = ({ label, onDateChange, initialDate = new Date() }) => {
  const [date, setDate] = useState(initialDate);
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
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />

      <Button title="Pick Date" onPress={() => setOpen(true)} />
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
    justifyContent: 'center',
  },
});

export default DatePickerField;
