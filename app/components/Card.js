import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You can use other icon libraries like FontAwesome or MaterialIcons

const Card = ({
  title,
  reward,
  duration,
  disqualificationText = 'High disqualification rate',
  disqualificationIcon = 'alert-circle-outline',
  disqualificationBgColor = 'bg-yellow-100',
  disqualificationTextColor = 'text-yellow-800',
  timeIcon = 'time-outline',
}) => {
  return (
    <View className="bg-white p-6 rounded-xl shadow-sm w-full h-48 mx-auto my-2">
      {/* Disqualification Banner */}
      {disqualificationText && (
        <View className={`flex-row items-center p-2 rounded-lg mb-4 ${disqualificationBgColor}`}>
          {disqualificationIcon && (
            <Ionicons name={disqualificationIcon} size={20} color="black" className="mr-2" />
          )}
          <Text className={`text-sm font-medium ${disqualificationTextColor}`}>
            {disqualificationText}
          </Text>
        </View>
      )}

      {/* Topic Name */}
      <Text className="text-black text-lg font-semibold mb-4">{title || 'Topic Name'}</Text>

      {/* Reward and Time */}
      <View className="flex-row justify-between items-center">


          <View className="bg-blue-100 px-3 py-1 rounded-lg w-40 h-12 justify-center">
            <Text className="text-blue-600 font-bold text-lg">
              $ {reward} <Text className="font-normal text-base">Reward</Text>
            </Text>
          </View>

        <View className="flex-row items-center">
          {timeIcon && <Ionicons name={timeIcon} size={20} color="gray" className="mr-1" />}
          <Text className="text-gray-500">{duration || '20 mins'}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
