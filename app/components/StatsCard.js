import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatsCard = ({
  number,
  label,
  iconName = 'checkmark-circle-outline',
  iconColor = '#4285F4'
}) => {
  return (
    <View className="bg-white p-4 rounded-xl shadow-lg flex-row items-center justify-between w-full h-full">
      <View>
        <Text className="text-2xl font-bold text-black">{number}</Text>
        <Text className="text-gray-600 text-sm">{label}</Text>
      </View>
      <Ionicons name={iconName} size={24} color={iconColor} />
    </View>
  );
};

export default StatsCard;