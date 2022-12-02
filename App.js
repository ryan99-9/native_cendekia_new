/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import Home from './pages/Home';
import Profile from './pages/Profile';
import SplashScreen from './SplashScreen';
import Intro from './Intro';
import Login from './pages/Login';
import Register from './pages/Register';
import Absensi from './pages/Absensi';
import Apply from './pages/Apply';
import Pengumumanapply from './pages/Pengumumanapply';
import Student from './pages/Student';
import Financial from './pages/Financial';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react/cjs/react.development';



const App = () => {
  // const [token,setToken]=useState();
  // useEffect(() => {
  //   AsyncStorage.getItem('token',(err,res)=>{
  //     setToken(res)
  //   })
  // }, [])
  if(true){
    return (
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Splashscreen"
        >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
          <Stack.Screen name="HOME" component={Home} options={{headerShown:false}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
          <Stack.Screen name="Absensi" component={Absensi} />
          <Stack.Screen name="Apply" component={Apply} />
          <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}} />
          <Stack.Screen name="Pengumumanapply" component={Pengumumanapply} options={{headerShown:false}}/>
          <Stack.Screen name="Student" component={Student} options={{headerShown:false}}/>
          <Stack.Screen name="Financial" component={Financial} options={{headerShown:false}}/>
          <Stack.Screen name="Splashscreen" component={SplashScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Splashscreen"
      // screenOptions={{headerShown:true}}
      >
        {/* <Stack.Screen name="HOME" component={Home} options={{headerShown:false}}/> */}
        {/* <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/> */}
        <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}} />
        <Stack.Screen name="Splashscreen" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
        {/* <Stack.Screen name="Student" component={Student} options={{headerShown:false}}/> */}
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
