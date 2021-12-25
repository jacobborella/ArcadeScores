import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import ScoresView from "../components/organisms/ScoresView";
import InputScore from "../components/molecules/InputScore";
import { useGames } from "../provider/GamesProvider";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ShowScores = ({ route, navigation }) => {
    const { game } = route.params;
    const {scores, findScores, addScore} = useGames();
    useEffect(() => {
        navigation.setOptions({
          title: "Scores for " + game.name,
        });
        findScores(game._id);
      }, []);

    return (
        <SafeAreaView>
            <InputScore title="Add score" onScoreAdded={(score) => {
                addScore(game._id, score.level, score.score);
            }}/>
            <ScoresView data={scores}/>
        </SafeAreaView>
      );
}


export default ShowScores;