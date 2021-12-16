import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';
import { Score } from '../atoms/Score';


const InputScore = (props) => {
  const [score, setScore] = useState('');
  const [level, setLevel] = useState('');
  return (
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <TextInput style={styles.score} placeholder="Score" value={score} onChangeText={setScore} keyboardType="numeric"/>
        <TextInput style={styles.level} placeholder="Level" value={level} onChangeText={setLevel} keyboardType="numeric"/>
        <Button title="Add score" onPress={() => {
                s = new Score();
                s.date=new Date();
                s.score=parseInt(score);
                s.level=parseInt(level);
                props.onScoreAdded(s);
                setScore('');
                setLevel('');   
            }}/>
    </View>
  );
}

const styles = StyleSheet.create({
    score: {
      width: 100,
      margin: 12,
      borderWidth: 1
    },
    level: {
        width: 50,
        margin: 12,
        borderWidth: 1
      },
    });

export default InputScore;