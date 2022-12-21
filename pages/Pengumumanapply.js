import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"", notify:"", email_user:"",
      //id dari data pengajar untuk show notify pengajar sesuai id pengajarnya
      id_pengajar:null,
      //isi pesan notify pengajar yang ingin ditampilkan
      pesan:[],

    };
  }
  componentDidMount(){
    AsyncStorage.getItem('email',(err,res)=>{
      this.setState({email_user:res});
      console.log(`email User : ${res}`);
    })
    //Menemukan ID pengajar - Get Data Pengajar - dari user
    AsyncStorage.getItem('token',(err,res)=>{
      Axios.get(`https://admin.menujudigital.com/api/datapengajar`,{headers: {
        Authorization: `Bearer ${res}`
      }}).then(res =>{
        res.data.map(item=>{
          if(item.email === this.state.email_user){
            this.setState({id_pengajar:item.id}), console.log(`Id Pengajar : ${item.id}`)
          }
        })
      })
    })
    AsyncStorage.getItem('token',(err,res)=>{
      Axios.get(`https://admin.menujudigital.com/api/notifypengajar`,{headers: {
        Authorization: `Bearer ${res}`
      }}).then((res) =>{
        // console.log(res.data);
        res.data.map(item=>{
          if(item.id_pengajar == this.state.id_pengajar){
            this.setState({pesan:item.pesan}), console.log(`Pesan dari Admin : ${item.pesan}`)
          }
        })
      }).catch(err=> console.log(err))
    })
  }
  
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../asset/iklan1.jpg')}
          style={{width:'100%',height:'100%',resizeMode:'cover'}}
        ><Text style={{textAlignVertical:'center', height:'100%',width:'100%',paddingStart:20,paddingEnd:2,fontSize:24,color:'white',fontWeight:'bold', textAlign:'left'}}>
          {this.state.pesan?this.state.pesan:"Belum Ada Informasi Untuk Anda"}</Text></ImageBackground>
      </View>
    );
  }
}

export default Home;
