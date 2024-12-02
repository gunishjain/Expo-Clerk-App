import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import Card from '../components/Card.js';
import StatsCard from '../components/StatsCard.js';
import ProfileCard from '../components/ProfileCard.js';

import styles from './styles/dashboardStyle.js'

const BalanceScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>

     
        <View style={[styles.statsContainer, { gap: 16 }]}>

        <StatsCard 
            number="$ 15.2"
            label="Current Balance"
            iconName="checkmark-circle-outline"
            iconColor="#4285F4"
            style={{ marginTop: 16 }}
          />


          <StatsCard 
            number="2"
            label="Studies Completed"
            iconName="checkmark-circle-outline"
            iconColor="#4285F4"
          />
        </View>

        



        <View style={styles.profileCardContainer}>
          <ProfileCard
            percentage={50}
            remainingQuestions={12}
            question="What is your medical specialty?"
            questionType="text"
            onSubmit={(answer) => console.log('Answer submitted:', answer)}
            onSkip={() => console.log('Question skipped')}
            onCompleteProfile={() => console.log('Complete Profile clicked')}
          />
        </View>

        
        <View style={styles.topicsContainer}>

              <Card 
                title="Topic Name"
                reward={120}
                duration="20 mins"
                disqualificationTextColor='red'
                disqualificationBgColor='bg-yellow-100'
              />
              <Card 
                title="Topic Name"
                reward={25}
                duration="50 mins"
                disqualificationText='Low Disqualification Rate'
              />

              <Card 
                title="Topic Name"
                reward={5}
                duration="50 mins"
                disqualificationText='Low Disqualification Rate'
              />

          
        </View>
      </View>
    </ScrollView>
  );
};


export default BalanceScreen;