import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, Text, StyleSheet, View } from "react-native";
import { useGames } from "../provider/GamesProvider";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ShowScores = ({navigation}) => {
  const [ avgScore, setAvgScore ] = useState(0)
  const [ currentResolution, setCurrentResolution ] = useState('week')
  const [ percentageChange, setPercentageChange ] = useState(0)
  const { selectedGame, findAvgScore } = useGames();
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
      updateAvg(currentResolution);
    }, []);

  const updateAvg = (resolution) => {
    const {avg, change} = findAvgScore(selectedGame._id, resolution);
    setAvgScore(avg);
    setPercentageChange(change);
    setCurrentResolution(resolution)
  }

  return (
      <SafeAreaView style={[{alignItems:'center'}]}>
          <Text>
            Your average score the past {currentResolution} is <Text style={styles.scoreText}>{avgScore}</Text>.{"\n"}
            That's <Text style={percentageChange >= 0? styles.betterScoreText: styles.worseScoreText}>{Math.abs(percentageChange)}%</Text> {percentageChange >= 0? "better": "worse"} than the previous {currentResolution}.
          </Text>
          <View style={[{flexDirection:'row', alignItems:'center'}]}>
            <Button title="year" onPress={() => {
              updateAvg("year");
            }}/>
            <Button title="month" onPress={() => {
              updateAvg("month");
            }}/>
            <Button title="week" onPress={() => {
              updateAvg("week");
            }}/>
            <Button title="day" onPress={() => {
              updateAvg("day");
            }}/></View>
          
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  scoreText: {
    fontWeight: 'bold'
  },
  worseScoreText: {
    color: 'red'
  },
  betterScoreText: {
    color: 'green'
  }
});

export default ShowScores;