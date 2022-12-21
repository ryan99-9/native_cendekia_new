import React, {Component} from 'react';
import {Text, View, Image, Button, TouchableOpacity} from 'react-native';
// import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


class Intro extends Component {
  componentDidMount(){
    AsyncStorage.getItem('token',(err,res)=>{
      console.log(`intro token: ${res}`);  
    })
  }
  render() {
    return (
      <View>
        <Image
          style={{
            height: '40%',
            width: '80%',
            marginTop: '50%',
            marginBottom: '10%',
            marginHorizontal: '10%',
            // transform:[{ rotateZ: '0.785398rad' }],
          }}
          
          source={require('./asset/homee.png')}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center',color:'black'}}>
          Selamat Datang di Cendikia!
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 30,color:'black'}}>
          Belajar Menjadi Lebih Menyenangkan
        </Text>
        <View style={{width: '80%', marginStart: '10%', marginEnd: '10%'}}>
           <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 20,
              backgroundColor: '#065B87',
              marginBottom:5,
              borderColor:'#065B87', borderWidth:1
            }}
            onPress={() => this.props.navigation.navigate('Login')}
            >
            <Text style={{color:'white'}}>Masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 20,
              backgroundColor: 'white',
              borderColor:'#065B87', borderWidth:1
            }}
            onPress={() => this.props.navigation.navigate('Register')}
            >
            <Text style={{color:'black'}}>Daftar</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

export default Intro;
