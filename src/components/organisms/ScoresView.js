import React from 'react';
import ScoreView from '../molecules/ScoreView';
import { View, FlatList } from 'react-native';

const ScoresView = (props) => {
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={({item}) => <ScoreView data={item}/>}
      />
    </View>
  );
}

export default ScoresView;