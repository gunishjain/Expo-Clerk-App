import React, { useState } from 'react';
import { Menu, Button } from 'react-native-paper';

const DropdownField = ({ label, options, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="outlined" onPress={openMenu}>
          {selected || label}
        </Button>
      }
    >
      {options.map((option) => (
        <Menu.Item key={option} onPress={() => handleSelect(option)} title={option} />
      ))}
    </Menu>
  );
};

export default DropdownField;
