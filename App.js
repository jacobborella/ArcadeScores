import React from 'react';
import Welcome from './src/screens/Welcome';
import ShowScores from './src/screens/ShowScores';
import SelectGame from './src/screens/SelectGame';
import AddGame from './src/screens/AddGame';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GamesProvider } from './src/provider/GamesProvider';
import ShowScoreStats from './src/screens/ShowScoreStats'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ScoresTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scores" component={ShowScores} options={{
      tabBarLabel: 'Scores',
      tabBarIcon: ({ focused, color, size }) => {
        return <Icon name="list" size={size} color={color} />;
      },
    }}/>
      <Tab.Screen name="Stats" component={ShowScoreStats} options={{
      tabBarLabel: 'Stats',
      tabBarIcon: ({ focused, color, size }) => {
        return <Icon name="trending-up" size={size} color={color} />;
      },
    }}/>
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <GamesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
                name="Welcome"
                component={Welcome}
              />
          <Stack.Screen
            name="SelectGame"
            component={SelectGame}
          />
          <Stack.Screen
            name="AddGame"
            component={AddGame}
          />
          <Stack.Screen 
            name="ShowScores"
            component={ScoresTabs}
            options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GamesProvider>
  );
}

export default App;