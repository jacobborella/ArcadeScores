import React from 'react';
import { Text, View } from 'react-native';
import { useGames } from '../../provider/GamesProvider';

const GameView = (props) => {
  const {setSelectedGame} = useGames();
  return (
    <View>
      <Text style={{color: 'blue', fontSize:30}}//TODO: dynamic font size
              onPress={() => {
                setSelectedGame(props.data);
                props.navigation.navigate('ShowScores')
              }
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