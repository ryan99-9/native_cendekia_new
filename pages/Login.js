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
      secure: true,
      eye:require('../asset/close_eyes.png'),
      email:"",
      password:""
      // token:AsyncStorage.getItem('token')
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

  onAdd = () => {
    let login = {
      email : this.state.email,
      password : this.state.password,
    }
    Axios.post(`https://admin.menujudigital.com/api/login`, login) 
    .then(res =>{
      console.log(`data login :${res.data.log.id}`);
      AsyncStorage.setItem('token', res.data.token); 
      AsyncStorage.setItem('email', res.data.log.email);
      AsyncStorage.setItem('name', res.data.log.name);
      AsyncStorage.setItem('id', res.data.log.id.toString());
      alert('sukses login'); 
      this.props.navigation.navigate('HOME')
    }).catch(err => {console.log(err);alert('Masukan email dan password yang terdaftar')})
  }
  
  render() {
    return (
      <ScrollView>
        <View
          style={{ width: '100%', height: '100%',alignItems: 'center', padding: 10,marginTop: '50%'}}>
            <View style={{
              borderColor:'#065B87', borderWidth:1,width:'100%',alignItems:'center',padding:20,borderRadius:20}}>
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
           <TouchableOpacity
            style={{
              width: '90%', justifyContent: 'center', alignItems: 'center',padding: 10,borderRadius: 20,
              backgroundColor: '#065B87',
              marginTop:30,
              borderColor:'#065B87', borderWidth:1
            }}
            onPress={this.onAdd}
            >
            <Text style={{color:'white'}}>Masuk</Text>
          </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

export default Home;
