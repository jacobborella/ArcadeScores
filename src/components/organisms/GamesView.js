import React from 'react';
import GameView from '../molecules/GameView';
import { View, FlatList } from 'react-native';

const GamesView = (props) => {
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={({item}) => <GameView navigation={props.navigation} data={(item)}/>}
      />
    </View>
  );
}

export default GamesView;