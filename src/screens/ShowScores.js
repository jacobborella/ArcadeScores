import React, { useEffect } from "react";
import { SafeAreaView, Button } from "react-native";
import ScoresView from "../components/organisms/ScoresView";
import InputScore from "../components/molecules/InputScore";
import { useGames } from "../provider/GamesProvider";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ShowScores = ({navigation}) => {
  const { selectedGame } = useGames();
  const {scores, findScores, addScore} = useGames();
  useEffect(() => {
      navigation.setOptions({
        headerTitle: "Scores for " + selectedGame.name,
        headerLeft: function Header() {
          return <Button title="Back" onPress={() => {
              navigation.popToTop();
          }
        }/>;
        }
      });
      findScores(selectedGame._id);
    }, []);

  return (
      <SafeAreaView>
          <InputScore title="Add score" onScoreAdded={(score) => {
              addScore(selectedGame._id, score.level, score.score);
          }}/>
          <ScoresView data={scores}/>
      </SafeAreaView>
    );
}


export default ShowScores;