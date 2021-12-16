import React from 'react';
import { Game } from '../components/atoms/Game';
import { Text, SafeAreaView, Button } from "react-native";

const SelectGame = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>SelectGame screen</Text>
            <Button
              title="Go to ShowScores"
              onPress={() =>
                navigation.navigate('ShowScores', { game: new Game("1942") })
              }
    />
        </SafeAreaView>
      );
}


export default SelectGame;