import React from 'react';
import { View, Text } from 'react-native';

function HomeScreen() {
  console.log('HomeScreen Loaded');
    return (
      <View >
        <Text style={{ fontSize:28, color:'red' }}>Home Screen</Text>
      </View>
    );
  }

  export default HomeScreen;