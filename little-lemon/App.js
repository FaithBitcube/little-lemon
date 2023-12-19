import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from './components/Header';

const Stack = createNativeStackNavigator();

const getIsSignedIn = async () => {
 
  return false
}



export default function App() {
  const [state, setState] = useState(false)
  const isSignedIn = getIsSignedIn();

  useEffect(() => {
    (async () => {
      try {
        const values = await AsyncStorage.getItem('signedIn');
        const keys = await AsyncStorage.getAllKeys()
        setState(values)
        console.log(values)
        console.log(keys)
      } catch (e) {
        //Alert.alert(`An error occurred: ${e.message}`);
        console.log('error')
        console.log(e)
      }
    })();
  }, []);
  // if(!state){
  //   return <View><Text>Splash</Text></View>
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          state ? (
            <>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen options={{headerTitle: () => <Header />}} screenOptions name='Profile' component={Profile} />
              {/* <Stack.Screen name='Onboarding' component={Onboarding} /> */}
            </>
          ) : (
            <Stack.Screen name='Onboarding' component={Onboarding} />
          )
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
