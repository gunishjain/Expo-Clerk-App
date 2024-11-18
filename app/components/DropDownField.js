import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({ 
  placeholder, 
  value, 
  options, 
  onSelect, 
  containerStyle 
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  return (
    <View style={[styles.container, containerStyle]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(val) => {
          const selected = items.find(item => item.value === val());
          if (selected) onSelect(selected);
        }}
        setItems={setItems}
        placeholder={placeholder}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
        listItemContainerStyle={styles.listItemContainer}
        textStyle={styles.textStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    minHeight: 50,
  },
  dropDownContainer: {
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  listItemContainer: {
    height: 40,
  },
  textStyle: {
    fontSize: 16,
    color: '#333',
  },
});

export default DropDown;