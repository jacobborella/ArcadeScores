import React, {useState} from 'react';
import { TextInput, SafeAreaView, StyleSheet, Button } from "react-native";
import { useGames } from '../provider/GamesProvider';


const AddGame = ({ navigation }) => {
    const[name, setName] = useState('')
    const[variant, setVariant] = useState('')
    const {games, createGame} = useGames()
    const saveNewGame = (name, variant) => {
      createGame(name, variant);
    /*
      const config = {
        schema: [Game.schema],
      };
      Realm.open(config).then((projectRealm) => {
        projectRealm.write(() => {
          projectRealm.create("Game", {
            name: name,
            variant: variant
          })
        })
        projectRealm.close();
      });
    */
        navigation.goBack();
    }
  return (
        <SafeAreaView>
            <TextInput style={styles.input} onChangeText={setName} placeholder="Name" value={name}/>
            <TextInput style={styles.input} onChangeText={setVariant} placeholder="Variant" value={variant}/>
            <Button title="Save" onPress={() => saveNewGame(name, variant)}/>
        </SafeAreaView>
      );

    }

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
export default AddGame;