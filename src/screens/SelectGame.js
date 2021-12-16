import React, { useState } from 'react';
import GamesView from '../components/organisms/GamesView';
import { Game } from '../components/atoms/Game';
import { Text, SafeAreaView, Button } from "react-native";

const SelectGame = ({ navigation }) => {
    const [games, setGames] = useState([
        new Game("1942", "MiSTer"),
        new Game("1942", "Nintendo Switch")
    ]);
    return (
        <SafeAreaView>
            <GamesView navigation={navigation} data={(navigation, games)}/>
        </SafeAreaView>
      );
}

export default SelectGame;