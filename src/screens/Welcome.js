import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button } from "react-native";
import { useGames } from '../provider/GamesProvider';
import app from '../realmApp';
import { StackActions } from '@react-navigation/native';


const Welcome = ({ navigation }) => {
  const {loginUser} = useGames()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      if(app.currentUser) {
          navigation.dispatch(
            StackActions.replace('SelectGame')
          );
}
      title: "Welcome"
    }, []);
    return (
        <SafeAreaView>
            <TextInput placeholder="username" value={username} onChangeText={setUsername}/>
            <TextInput placeholder="password" value={password} onChangeText={setPassword}/>
            <Button onPress={() => {
                loginUser(username, password).then(() => {
                    console.log("User logged in: " + app.currentUser);
                    navigation.dispatch(
                        StackActions.replace('SelectGame')
                      );
                }
                );
            }} title='login'/>
            <Button onPress={() => {
                console.log("logging user out: " + app.currentUser);
                if(app.currentUser) {
                    app.currentUser.logOut();
                }
            }} title='logout'/>
        </SafeAreaView>
      );
}

export default Welcome;