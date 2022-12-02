import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validate_user:false,validate_pengajar:false,
      secure: true, secure2: true,
      eye:require('../asset/close_eyes.png'),eye2:require('../asset/close_eyes.png'),
      email:"", name:"", password:"", confirm_password:"",
      asal_kampus:"", no_telp:"",mapel:"",nama_bank:"",rek_bank:"",an_rek_bank:"",
    };
  }
  componentDidMount () {
    AsyncStorage.getItem('token',(err,res)=>{
      console.log(`login token : ${res}`);
    })
  }

  onEye = () => {
    if(this.state.secure){
      this.setState({secure: false})
      this.setState({eye: require('../asset/open_eyes.png') })
    } else {
      this.setState({secure: true})
      this.setState({eye: require('../asset/close_eyes.png') })
    }
  };
  onEye2 = () => {
    if(this.state.secure){
      this.setState({secure2: false})
      this.setState({eye2: require('../asset/open_eyes.png') })
    } else {
      this.setState({secure2: true})
      this.setState({eye2: require('../asset/close_eyes.png') })
    }
  };

  onAdd = () => {
    //add ke user
    let register = {
      email : this.state.email,
      password : this.state.password,
      name:this.state.name,
      confirm_password:this.state.confirm_password
    }
    Axios.post(`https://admin.menujudigital.com/api/register`, register) 
    .then(res =>{
      console.log(`data register user :${res.data}`);
      // alert(`${res.data.message}`); 
      // this.setState({validate_user:true})
      let register_pengajar={
        nama_pengajar:this.state.name,
        email:this.state.email, an_rek_bank:this.state.an_rek_bank,
        asal_kampus:this.state.asal_kampus, rek_bank:this.state.rek_bank,
        no_telp:this.state.no_telp, mapel:this.state.mapel, nama_bank:this.state.nama_bank
      }
      Axios.post(`https://admin.menujudigital.com/api/datapengajar`, register_pengajar) 
      .then(res =>{
        console.log(`data register pengajar :${res.data}`);
        alert('sukses register');
        this.props.navigation.navigate('Login')
        // this.setState({validate_pengajar:true})
      }).catch(err => {console.log(err);alert('Pastikan Semua Data Sudah Terisi Benar')})
      
    }).catch(err => {console.log(err);alert('Pastikan data sudah terisi benar')})
    //add ke data pengajar
  }
  
  render() {
    return (
      <ScrollView>
        <View
          style={{ width: '100%', height: '100%',alignItems: 'center', padding: 10,marginTop: '5%'}}>
            <View style={{
              borderColor:'#065B87', borderWidth:1,width:'100%',alignItems:'center',padding:20,borderRadius:20}}>
           <TextInput  style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            onChangeText={name=>this.setState({name})} label="Nama" mode="outlined" placeholder="Nama"
          />
          <TextInput
            onChangeText={email=>this.setState({email})}
            label="Email" mode="outlined" placeholder="Email"
            style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
          />
          <TextInput
            onChangeText={password=>this.setState({password})}
            label="Password" mode="outlined" placeholder="tuliskan Password" secureTextEntry={this.state.secure}
            style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            right={
              <TextInput.Icon
                icon={({size}) => (
                  <Image
                    source={this.state.eye}
                    style={{width: size, height: size}}
                  />
                )}
                onPress={this.onEye}
              />
            }
          />
          <TextInput
            onChangeText={confirm_password=>this.setState({confirm_password})}
            label="Confirm Password" mode="outlined" placeholder="Confirm Password" secureTextEntry={this.state.secure2}
            style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            right={
              <TextInput.Icon
                icon={({size}) => (
                  <Image
                    source={this.state.eye2}
                    style={{width: size, height: size}}
                  />
                )}
                onPress={this.onEye2}
              />
            }
          />
          <TextInput  style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            onChangeText={asal_kampus=>this.setState({asal_kampus})} label="Asal Kampus" mode="outlined" placeholder="Asal Kampus"
          />
          <TextInput  style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            onChangeText={no_telp=>this.setState({no_telp})} label="No Hp" mode="outlined" placeholder="No Hp"
          />
          <TextInput  style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            onChangeText={mapel=>this.setState({mapel})} label="Mapel" mode="outlined" placeholder="Mapel"
          />
           <TextInput  style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            onChangeText={nama_bank=>this.setState({nama_bank})} label="Bank" mode="outlined" placeholder="Bank"
          />
           <TextInput  style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            onChangeText={rek_bank=>this.setState({rek_bank})} label="No Rek" mode="outlined" placeholder="No Rek"
          />
           <TextInput  style={{width: '90%', justifyContent: 'center', marginBottom: 10}}
            onChangeText={an_rek_bank=>this.setState({an_rek_bank})} label="An Rek" mode="outlined" placeholder="An Rek"
          />
           <TouchableOpacity
            style={{
              width: '90%', justifyContent: 'center', alignItems: 'center',padding: 10,borderRadius: 20,
              backgroundColor: '#065B87',
              marginTop:30,
              borderColor:'#065B87', borderWidth:1
            }}
            onPress={this.onAdd}
            >
            <Text style={{color:'white'}}>Daftar</Text>
          </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

export default Home;
