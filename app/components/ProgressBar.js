import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProgressBar = ({ percentage }) => {
  return (
    <View style={styles.container}>
      <CircularProgress
        value={percentage}
        radius={45}
        duration={500}
        activeStrokeColor='#39608F'
        inActiveStrokeColor='#E8E8E8'
        maxValue={100}
        valueSuffix={'%'}
        activeStrokeWidth={6}
        inActiveStrokeWidth={6}
        progressValueColor='#000000'
        progressValueStyle={{fontWeight:'400'}}
        progressValueFontSize='17.5'
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
    marginRight:10,
    marginTop: 30

  },
});

export default ProgressBar;