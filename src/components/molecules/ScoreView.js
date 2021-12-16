import React from 'react';
import { Text, View } from 'react-native';

const ScoreView = (props) => {
  return (
    <View>
      <Text>Time: {props.data.date.toLocaleString()}</Text>
      <Text>Score: {props.data.score.toString()} Level: {props.data.level.toString()}</Text>
      <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
    </View>
  );
}

export default ScoreView;