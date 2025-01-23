import React from 'react';
import { View, Text } from 'react-native';

function UserScreen() {
  console.log('UserScreen Loaded');
    return (
      <View >
        <Text style={{ fontSize:28, color:'red' }}>User Screen</Text>
      </View>
    );
  }

  export default UserScreen;