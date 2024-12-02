import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProgressBar = ({ percentage }) => {
  return (
    <View style={styles.container}>
      <CircularProgress
        value={percentage}
        radius={25}
        duration={2000}
        progressValueColor={'#4285F4'}
        maxValue={100}
        title={''}
        titleColor={'black'}
        titleStyle={{ fontWeight: 'bold' }}
        progressValueStyle={{ fontSize: 14 }}
        activeStrokeWidth={6}
        inActiveStrokeWidth={6}
        titleFontSize={20}
        progressValueFontSize={14}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
});

export default ProgressBar;