import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home'
import TabNavigator from './src/components/TabNavigator/TabNavigator';
import editarProfile from './src/screens/editarProfile'
import otroProfile from './src/screens/otroProfile'
import Comments from "./src/screens/Comments";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name ='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name ='TabNavigator' component={TabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name ='editarProfile' component={editarProfile} options={{headerShown: false}}/> 
        <Stack.Screen name ='otroProfile' component={otroProfile} options={{headerShown: false}}/>
        <Stack.Screen name ='Comments' component={Comments} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}



export default App;
