import React, {useState} from 'react';
import { TextInput, SafeAreaView, StyleSheet, Button } from "react-native";

const AddGame = ({ navigation }) => {
    const[name, setName] = useState('')
    const[variant, setVariant] = useState('')
    return (
        <SafeAreaView>
            <TextInput style={styles.input} onChangeText={setName} placeholder="Name" value={name}/>
            <TextInput style={styles.input} onChangeText={setVariant} placeholder="Variant" value={variant}/>
            <Button title="Save" onPress={() => saveNewGame(navigation)}/>
        </SafeAreaView>
      );
}

const saveNewGame = (navigation) => {
    navigation.goBack();
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