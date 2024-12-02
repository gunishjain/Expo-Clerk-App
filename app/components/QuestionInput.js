import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const QuestionInput = ({ 
  question, 
  questionType = 'dropdown', // can be 'dropdown' or 'text'
  options = [],
  onSubmit, 
  onSkip 
}) => {
  const [answer, setAnswer] = useState('');

  const renderInput = () => {
    switch (questionType) {
      case 'dropdown':
        return (
          <Picker
            selectedValue={answer}
            onValueChange={(value) => setAnswer(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select..." value="" />
            {options.map((option, index) => (
              <Picker.Item 
                key={index} 
                label={option.label} 
                value={option.value} 
              />
            ))}
          </Picker>
        );
      case 'text':
        return (
          <TextInput
            value={answer}
            onChangeText={setAnswer}
            style={styles.textInput}
            placeholder="Enter your answer"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      {renderInput()}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={() => {
          onSubmit(answer);
          setAnswer('');
        }}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.skipButton}
        onPress={onSkip}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  picker: {
    backgroundColor: '#eee',
    marginBottom: 16,
    borderRadius: 8,
  },
  textInput: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#4285F4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  skipButton: {
    backgroundColor: '#f1f3f4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default QuestionInput;