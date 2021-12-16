import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import ScoresView from "../components/organisms/ScoresView";
import InputScore from "../components/molecules/InputScore";

const ShowScores = ({ route, navigation }) => {
    const { game } = route.params;
    const [scores, setScores] = useState([]);
    return (
        <SafeAreaView>
            <Text style={styles.game}>{game.name} ({game.variant})</Text>
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


export default ShowScores;