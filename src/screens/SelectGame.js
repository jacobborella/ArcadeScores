import React, { useState, useEffect } from 'react';
import GamesView from '../components/organisms/GamesView';
import { Button, StyleSheet, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useGames } from '../provider/GamesProvider';

const SelectGame = ({ navigation }) => {
  const {games, createGame} = useGames()
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <Button title="+" onPress={() => navigation.navigate('AddGame')}/>;
      },
      title: "Select a Game",
    });
  }, []);
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