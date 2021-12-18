import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import ScoresView from "../components/organisms/ScoresView";
import InputScore from "../components/molecules/InputScore";

const ShowScores = ({ route, navigation }) => {
    const { game } = route.params;
    const [scores, setScores] = useState([]);
    useEffect(() => {
        navigation.setOptions({
          title: "Scores for " + game.name,
        });
      }, []);
    return (
        <SafeAreaView>
            <InputScore title="Add score" onScoreAdded={(score) => {
                setScores(scores => [score,...scores] );
            }}/>
            <ScoresView data={scores}/>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    game: {
      fontSize: 26,
      fontWeight: "bold"
    }
});

//<Text style={styles.game}>{game.name} ({game.variant})</Text>

export default ShowScores;