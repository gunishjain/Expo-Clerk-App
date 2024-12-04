import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import QuestionInput from './QuestionInput';

const ProfileCard = ({
  percentage = 25,
  remainingQuestions = 12,
  question,
  questionType,
  options,
  onSubmit,
  onSkip,
  onCompleteProfile
}) => {
  return (
    <View style={styles.container}>
      {/* Header and Progress Section */}
      <View style={styles.headerRow}>
      <ProgressBar percentage={percentage} />

        <View style={styles.textContainer}>
          <Text style={styles.heading}>Profile completeness</Text>
          <Text style={styles.description}>
            Answer more profile questions to increase your chances of being chosen for studies.
          </Text>
        </View>
      </View>

      {/* Clickable Complete Profile */}
      <TouchableOpacity onPress={onCompleteProfile}>
        <Text style={styles.completeProfileLink}>Complete Profile</Text>
      </TouchableOpacity>

      {/* Questions Section */}
      <View style={styles.questionSection}>
        <Text style={styles.remainingQuestions}>
          {remainingQuestions} questions remaining
        </Text>
        
        <QuestionInput
          question={question}
          questionType={questionType}
          options={options}
          onSubmit={onSubmit}
          onSkip={onSkip}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  completeProfileLink: {
    color: '#2A6A9D',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 24,
    marginLeft: 110
  },
  questionSection: {
    marginTop: 8,
  },
  remainingQuestions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});

export default ProfileCard;