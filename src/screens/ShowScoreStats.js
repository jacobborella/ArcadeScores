import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, Text, StyleSheet, View, Dimensions, Platform, PixelRatio } from "react-native";
import { useGames } from "../provider/GamesProvider";
import { LogBox } from 'react-native';
import ScoresView from "../components/organisms/ScoresView";


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const ShowScores = ({navigation}) => {
  const [ avgScore, setAvgScore ] = useState(0)
  const [ topScores, setTopScores ] = useState([])
  const [ currentResolution, setCurrentResolution ] = useState('week')
  const [ percentageChange, setPercentageChange ] = useState(0)
  const { selectedGame, findAvgScore, findtopScores } = useGames();
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
      const onScreenRefresh = navigation.addListener('focus', () => {
        updateAvg(currentResolution);
        setTopScores(findtopScores(selectedGame._id, 10));
      });
      return onScreenRefresh;
    }, [navigation]);

  const updateAvg = (resolution) => {
    const {avg, change} = findAvgScore(selectedGame._id, resolution);
    setAvgScore(avg);
    setPercentageChange(change);
    setCurrentResolution(resolution)
  }

  return (
      <SafeAreaView style={[{alignItems:'center'}]}>
          <Text style={{fontSize: normalize(18)}}>
            Your average score this {currentResolution} is <Text style={styles.scoreText}>{avgScore}</Text>. 
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
          <Text>Top 10 scores</Text>
          <ScoresView data={topScores}/>
          
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