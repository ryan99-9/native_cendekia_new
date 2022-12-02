import { StackActions } from "@react-navigation/native";
import React, {Component} from "react";
import { View, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


class Splash extends Component{

    componentDidMount(){
      AsyncStorage.getItem('token',(err,res)=>{
        if(!res){setTimeout(()=>{this.props.navigation.dispatch(StackActions.replace('Intro'))},3000)}
        else{setTimeout(()=>{this.props.navigation.dispatch(StackActions.replace('HOME'))},3000)}   
      })
    }

  render(){
    return (
      <View style={{backgroundColor:'#065B87',height:'100%',width:'100%'}}>
        <Image 
        style={{height:'30%',width:'50%',marginVertical:'60%',marginHorizontal:'25%'}}
        source={require('./asset/logo112.png')} />
      </View>
    );
  }
}

export default Splash;