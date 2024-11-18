import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import countries from '../utils/countryCodes';

const CountryCodePicker = ({ 
  value,
  onSelect,
  containerStyle,
  error,
  searchable = true
}) => {
  const [open, setOpen] = useState(false);
  
  const items = countries.map(country => ({
    label: country.label,
    value: country.code,
    icon: () => (
      <Text style={styles.iconText}>
        {country.flag} {country.dial_code}
      </Text>
    ),
    ...country
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <DropDownPicker
        open={open}
        value={value?.code || items[0].value}
        items={items}
        setOpen={setOpen}
        setValue={(val) => {
          const selected = items.find(item => item.value === val());
          if (selected) onSelect(selected);
        }}
        searchable={searchable}
        searchPlaceholder="Search country..."
        placeholder="Select country"
        style={[styles.dropdown, error && styles.errorBorder]}
        dropDownContainerStyle={styles.dropDownContainer}
        listItemContainerStyle={styles.listItemContainer}
        textStyle={styles.textStyle}
        searchTextInputStyle={styles.searchInput}
        searchContainerStyle={styles.searchContainer}
        showArrowIcon={true}
        showTickIcon={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    zIndex: 1000,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    minHeight: 48,
  },
  errorBorder: {
    borderColor: 'red',
  },
  dropDownContainer: {
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  listItemContainer: {
    height: 48,
  },
  textStyle: {
    fontSize: 14,
    color: '#333',
  },
  searchContainer: {
    borderBottomColor: '#eee',
  },
  searchInput: {
    borderColor: '#eee',
    height: 36,
    fontSize: 14,
  },
  iconText: {
    marginRight: 10,
    fontSize: 14,
  },
});

export default CountryCodePicker;