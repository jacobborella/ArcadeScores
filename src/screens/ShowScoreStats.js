import React, { useEffect } from "react";
import { SafeAreaView, Button, Text } from "react-native";
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
        headerTitle: "Score stats for " + selectedGame.name,
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
          <Text>TBD</Text>
      </SafeAreaView>
    );
}


export default ShowScores;