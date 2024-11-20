import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

const DatePickerField = ({ label, onDateChange, style }) => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleConfirm = (selectedDate) => {
    setOpen(false);
    setDate(selectedDate);
    if (onDateChange) onDateChange(selectedDate);
  };

  return (
    <View style={[styles.inputContainer, style?.container]}>
      <TouchableOpacity
        style={[styles.input, style?.input]}
        onPress={() => setOpen(true)}
      >
        <Text style={style?.text}>{date ? date.toLocaleDateString() : label}</Text>
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
    </View>
  );
};

const styles = {
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
};

export default DatePickerField;
