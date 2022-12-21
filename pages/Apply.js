import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama_pengajar:"",
      id_pengajar:0,
      asal_kampus:"",
      no_telp:"",
      email:"",
      mapel:"",
      token:"",
    };
  }
  componentDidMount(){
    AsyncStorage.getItem('token',(err,res)=>{
        this.setState({token:res})
    })
  }
  onAdd = () => {
    let applydata = {
      id_pengajar : this.state.id_pengajar,
      nama_pengajar : this.state.nama_pengajar, 
      asal_kampus:this.state.asal_kampus,
      no_telp:this.state.no_telp,
      email:this.state.email,
      mapel:this.state.mapel,
    }
    let notify = {
      id_pengajar : this.state.id_pengajar,
      nama_pengajar : this.state.nama_pengajar, 
    }
    if(applydata.nama_pengajar.length === 0 || applydata.id_pengajar.length === 0||applydata.asal_kampus.length ===0||applydata.no_telp.length===0||applydata.email.length===0||applydata.mapel.length===0){ return alert('Lengkapi semua data')}
    Axios.post(`https://admin.menujudigital.com/api/apply`, applydata, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      }
    }) .then((res) => {
      Axios.post(`https://admin.menujudigital.com/api/notifyadmin`, notify, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      }
    }).then((ress)=>{console.log(ress.data);}).catch(errr=>console.log(errr))
      console.log(res.data),alert('Permintaan berhasil dikirim'),this.props.navigation.navigate('HOME')
    })
  }
  render() {
    return (
      <ScrollView>
        <Text style={{fontSize:14,textAlign:'center',padding:10,marginTop:20,fontWeight:'bold',color:'#3D114E'}}>Lengkapi data berikut untuk mendapatkan siswa baru</Text>
        <View style={{width: '100%', height: '100%',  alignItems:'center', padding: 10, marginTop: '5%',}}>
            <View style={{ borderColor:'#3D114E', borderWidth:1, width:'100%', alignItems:'center', padding:20}}>
          <TextInput onChangeText={nama_pengajar=>this.setState({nama_pengajar})} label="Nama Pengajar" mode="outlined" placeholder="tuliskan nama" outlineColor='#3D114E'  activeOutlineColor='#3D114E' placeholderTextColor='#3D114E' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={id_pengajar=>this.setState({id_pengajar})} label="Id Pengajar" mode="outlined" placeholder="tuliskan id" outlineColor='#3D114E'  activeOutlineColor='#3D114E' placeholderTextColor='#3D114E' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={email=>this.setState({email})} label="Email" mode="outlined" placeholder="tuliskan email" outlineColor='#3D114E'  activeOutlineColor='#3D114E' placeholderTextColor='#3D114E' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={asal_kampus=>this.setState({asal_kampus})} label="Asal Kampus" mode="outlined" placeholder="tuliskan asal kampus" outlineColor='#3D114E'  activeOutlineColor='#3D114E' placeholderTextColor='#3D114E' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={no_telp=>this.setState({no_telp})} label="No Hp" mode="outlined" placeholder="tuliskan nomer hp" outlineColor='#3D114E'  activeOutlineColor='#3D114E' placeholderTextColor='#3D114E' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={mapel=>this.setState({mapel})} label="Mapel" mode="outlined" placeholder="tuliskan Mapel" outlineColor='#3D114E'  activeOutlineColor='#3D114E' placeholderTextColor='#3D114E' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>          
           <TouchableOpacity
            style={{ width: '90%', borderColor:'#3D114E', borderWidth:1,justifyContent: 'center', alignItems: 'center',  marginTop:30, padding: 10,  borderRadius: 20, backgroundColor: '#3D114E'}}
            onPress={this.onAdd} >
            <Text style={{color:'white'}}>Apply</Text></TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

export default Home;
