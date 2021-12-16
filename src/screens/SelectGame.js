import React, { useState } from 'react';
import GamesView from '../components/organisms/GamesView';
import { Game } from '../components/atoms/Game';
import { StyleSheet, View, Image, TouchableOpacity, SafeAreaView } from "react-native";

const SelectGame = ({ navigation }) => {
    const [games, setGames] = useState([
        new Game("1942", "MiSTer"),
        new Game("1942", "Nintendo Switch"),
        new Game("Bubble Bobble", "MiSTer"),
        new Game("Enter the Gungeon", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch"),
        new Game("1942", "Nintendo Switch")
    ]);
    return (
        <SafeAreaView>
            <GamesView navigation={navigation} data={(navigation, games)}/>
            <View style={styles.MainContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddGame')} style={styles.TouchableOpacityStyle} >
                    <Image source={require('../assets/Floating_Button.png')} 
                        style={styles.FloatingButtonStyle} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      );
}
  
const styles = StyleSheet.create({

    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : '#F5F5F5'
    },
  
    TouchableOpacityStyle:{
  
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
  
    FloatingButtonStyle: {
  
      resizeMode: 'contain',
      width: 50,
      height: 50,
    }
  });

export default SelectGame;