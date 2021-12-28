import React, { useEffect } from 'react';
import GamesView from '../components/organisms/GamesView';
import { Button, SafeAreaView } from "react-native";
import { useGames } from '../provider/GamesProvider';

const SelectGame = ({ navigation }) => {
  const {games, loadGames, logoutUser} = useGames()
  useEffect(() => {
    loadGames();
    navigation.setOptions({
      headerRight: function Header() {
        return <Button title="+" onPress={() => navigation.navigate('AddGame')}/>;
      },
      headerLeft: function Header() {
        return <Button title="Logout" onPress={() => {
          logoutUser().then(() => {
            navigation.navigate('Welcome')
          });
        }
      }/>;
      },
      title: "Select a Game",
    });
  }, []);
    return (
        <SafeAreaView>
            <GamesView navigation={navigation} data={(navigation, games)}/>
        </SafeAreaView>
      );
}

export default SelectGame;