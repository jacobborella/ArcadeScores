import React from 'react';
import { Button, View } from 'react-native';

const GameView = (props) => {
  return (
    <View>
      <Button
              title={props.data.name + " (" + props.data.variant + ")"}
              onPress={() =>
                props.navigation.navigate('ShowScores', { game: props.data })
              }
            />
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