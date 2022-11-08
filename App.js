import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name ='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name ='Login' component={Login} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
