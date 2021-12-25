import React from 'react';
import { Text, View } from 'react-native';

const GameView = (props) => {
  return (
    <View>
      <Text style={{color: 'blue', fontSize:30}}//TODO: dynamic font size
              onPress={() =>
                props.navigation.navigate('ShowScores', { game: props.data })
              }>{props.data.name + " (" + props.data.variant + ")"}</Text>
      <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
    </View>
  );
}

export default GameView;