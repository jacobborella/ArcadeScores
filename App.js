import React from 'react';
import ShowScores from './src/screens/ShowScores';
import SelectGame from './src/screens/SelectGame';
import { Game } from './src/components/atoms/Game';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="SelectGame"
          component={SelectGame}
        />
        <Stack.Screen 
          name="ShowScores"
          component={ShowScores}
          options={{game: new Game("1942")}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;