import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';

const ProgressStepper = ({ currentStep }) => {
  const steps = [
    { id: 1, title: 'Personal Details' },
    { id: 2, title: 'Verify' },
    { id: 3, title: 'Professional Details' }
  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          <View style={[
            styles.circle,
            currentStep >= step.id && styles.activeCircle
          ]}>
            {currentStep > step.id ? (
              <Text style={styles.checkmark}>✓</Text>
            ) : (
              <Text style={[
                styles.stepNumber,
                currentStep >= step.id && styles.activeText
              ]}>
                {step.id}
              </Text>
            )}
          </View>
          <Text style={[
            styles.stepTitle,
            currentStep >= step.id && styles.activeText
          ]}>
            {step.title}
          </Text>
          {index < steps.length - 1 && (
            <View style={[
              styles.line,
              currentStep > step.id && styles.activeLine
            ]} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    stepContainer: {
      alignItems: 'center',
      flex: 1,
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    activeCircle: {
      backgroundColor: '#000',
    },
    stepNumber: {
      color: '#757575',
    },
    activeText: {
      color: '#000',
    },
    checkmark: {
      color: '#FFF',
    },
    stepTitle: {
      fontSize: 12,
      color: '#757575',
      textAlign: 'center',
    },
    line: {
      position: 'absolute',
      right: '-50%',
      top: 15,
      width: '100%',
      height: 1,
      backgroundColor: '#E0E0E0',
    },
    activeLine: {
      backgroundColor: '#000',
    },
  });

  export default ProgressStepper