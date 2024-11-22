import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { usePathname } from 'expo-router';

const steps = [
  { id: 1, title: 'Personal Details', path: 'personal-details' },
  { id: 2, title: 'Verify', path: 'verify' },
  { id: 3, title: 'Professional Details', path: 'professional-details' }
];

const AuthStepper = () => {
  const pathname = usePathname();
  const currentStep = steps.findIndex(step => pathname.includes(step.path)) + 1;

  return (
    <View style={styles.container}>
      <View style={styles.stepperContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <View style={styles.stepWrapper}>
              <View style={[
                styles.circle,
                index + 1 < currentStep && styles.completedCircle,
                index + 1 === currentStep && styles.activeCircle,
                index + 1 > currentStep && styles.inactiveCircle,
              ]}>
                {index + 1 < currentStep ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text style={[
                    styles.stepNumber,
                    index + 1 === currentStep && styles.activeStepNumber,
                    index + 1 > currentStep && styles.inactiveStepNumber,
                  ]}>
                    {step.id}
                  </Text>
                )}
              </View>
              <Text style={[
                styles.stepTitle,
                index + 1 <= currentStep ? styles.activeStepTitle : styles.inactiveStepTitle
              ]}>
                {step.title}
              </Text>
            </View>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <View style={[
                styles.connector,
                index + 1 < currentStep ? styles.activeConnector : styles.inactiveConnector
              ]} />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "20 30",
    margin: "40 50",
    backgroundColor: '#fff'
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 0,
  },
  stepWrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCircle: {
    backgroundColor: '#000000',
  },
  activeCircle: {
    backgroundColor: '#000000',
  },
  inactiveCircle: {
    backgroundColor: '#D1D5DB',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  stepNumber: {
    fontSize: 14,
  },
  activeStepNumber: {
    color: '#FFFFFF',
  },
  inactiveStepNumber: {
    color: '#4B5563',
  },
  stepTitle: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  activeStepTitle: {
    color: '#000000',
  },
  inactiveStepTitle: {
    color: '#9CA3AF',
  },
  connector: {
    height: 4,
    width: 20,
    marginHorizontal: 8,
    borderWidth: 1, // Temporary border for debugging
  borderColor: 'black',
  },
  activeConnector: {
    backgroundColor: '#000000',
  },
  inactiveConnector: {
    backgroundColor: '#000000',
  },
});

export default AuthStepper;