import React, {Component} from 'react';
import {Text,ScrollView,Image,FlatList,View,Dimensions,ImageBackground, TouchableOpacity} from 'react-native';
import {Button,Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'
const {width, height} = Dimensions.get('screen');
const imageW = width * 0.7;
const imageH = imageW * 1.54;
var data =[];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "dummy",data:[],token:'', id_user:"",email:"",
      carouselData: [
        [require('../asset/iklan23.jpg'),'',''],
        [require('../asset/iklan4.jpg'),'',''],
        [require('../asset/iklan12.jpg'),"",''],
        [require('../asset/iklan33.jpg'),"",''],
      ],
    };
  }
  componentDidMount(){
    AsyncStorage.getItem('email',(err,res)=>{
      this.setState({email:res});
      console.log(res);
    })
    AsyncStorage.getItem('token',(err,res)=>{
      Axios.get(`https://admin.menujudigital.com/api/teks`,{headers: {
        Authorization: `Bearer ${res}`
      }}).then(res =>{
        console.log(res.data);
        this.setState({carouselData:[
          [require('../asset/iklan23.jpg'),res.data[0].judul,res.data[0].teks],
          [require('../asset/iklan4.jpg'),res.data[1].judul,res.data[1].teks],
          [require('../asset/iklan12.jpg'),res.data[2].judul,res.data[2].teks],
          [require('../asset/iklan33.jpg'),res.data[3].judul,res.data[3].teks],
        ]})
      })
      //set Id Pengajar
      Axios.get(`https://admin.menujudigital.com/api/datapengajar`,{headers: {
        Authorization: `Bearer ${res}`
      }}).then(res =>{
        res.data.map(item=>{
          if(item.email === this.state.email) 
          {return AsyncStorage.setItem('idpengajar', item.id.toString());
        }
        })
      })
    })
    AsyncStorage.getItem('name',(err,res)=>{
      this.setState({nama:res});
      console.log(res);
    })
    AsyncStorage.getItem('id',(err,res)=>{
      this.setState({id_user:res});
      console.log(`Id User : ${res}`);
    })
    
  }

  onLogout = () => {
    AsyncStorage.getItem('token',(err,res)=>{
      Axios.get(`https://admin.menujudigital.com/api/logout`,{headers: {
        Authorization: `Bearer ${res}`
      }}).then(async (res) =>{ 
        console.log(res.data);
        alert('Anda Keluar');
        await AsyncStorage.setItem('token','')
      })
    })
    this.props.navigation.navigate('Intro')
  }

  render() {
    return (
      <ScrollView>
        {/* Bar Atas */}
        <View style={{ backgroundColor: '#065B87', width: '100%',height: 150, borderBottomLeftRadius: 20,borderBottomRightRadius: 20,display: 'flex',flexDirection: 'row',}}>
          <View style={{flex: 0.5, padding: 20}}>
            {/* <img src='../asset/logo112.png' alt='logo'/> */}
            <Image style={{ height: '100%', width: '100%'}} source={require('../asset/logo112.png')}/>
          </View>
          <View style={{ flex: 1,justifyContent: 'center',alignItems: 'flex-end',padding: 20,}}>
            <Text style={{ color: 'white',fontSize: 18}}>Hai {this.state.nama}
            </Text>
            <Text style={{ color: 'white',fontSize: 16   }}>
              Welcome to Teacher Area
            </Text>
            <TouchableOpacity onPress={this.onLogout}><Text style={{paddingStart:20,paddingEnd:20,paddingBottom:5,paddingTop:5,borderColor:'white',borderWidth:2,borderRadius:10,color:'white',fontSize:16,marginBottom:-20,marginTop:20}} >Logout</Text></TouchableOpacity>
          </View>
        </View>
        {/* Bar Atas */}
        {/* Carousel */}
        <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold',color:'black'}}>
          Information
        </Text>
        <View style={{flex: 1, backgroundColor: '#0000'}}>
          <FlatList
            data={this.state.carouselData} keyExtractor={(_, index) => index.toString()} horizontal pagingEnabled
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <ImageBackground
                    source={item[0]}
                    style={{width: imageW, height: imageH, resizeMode: 'cover'}}
                  >
                    <View style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',marginTop:140,paddingRight:40,paddingLeft:40}}><Text style={{marginTop:0, paddingStart:0,paddingEnd:0,fontSize:24,textAlignVertical:'center',color:'white',fontWeight:'bold', textAlign:'right'}}>
                    {item[1]}</Text>
                    <Text style={{marginTop:0,paddingStart:0,paddingEnd:0,fontSize:16,textAlignVertical:'center',color:'white',fontWeight:'bold', textAlign:'right'}}>
                    {item[2]}</Text></View></ImageBackground>
                </View>
              );
            }}
          />
        </View>
        {/* Carousel */}

        <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold',color:'black'}}>
          Action
        </Text>
        <View>
          <Card style={{margin: 20, padding: 20, borderRadius:40}}>
            <Card.Title title="Teaching absences" subtitle="Fill these after teaching"/>
            <Card.Cover source={require('../asset/card00.jpg')} />
            <Card.Actions>
              <Button onPress={() => this.props.navigation.navigate('Absensi')}>Fill</Button>
            </Card.Actions>
          </Card>
        </View>
        <View>
          <Card
            style={{margin: 20, padding: 20,borderRadius:40}}>
            <Card.Title title="Apply For New Student" subtitle="Finding your student right now" style={{color:'#065B87'}}/>
            <Card.Cover source={require('../asset/card34.jpg')} />
            <Card.Actions>
              <Button onPress={() => this.props.navigation.navigate('Apply')} >Apply</Button>
            </Card.Actions>
          </Card>
        </View>
        <View>
          <Card style={{margin: 20,padding: 20,borderRadius:40}}>
            <Card.Title title="See My Student" subtitle="Observe Your Student"/>
            <Card.Cover source={require('../asset/card32.jpg')} />
            <Card.Actions>
              <Button  onPress={() => this.props.navigation.navigate('Student')}>Observe Here</Button>
            </Card.Actions>
          </Card>
        </View>
        <View>
          <Card style={{margin: 20,padding: 20,borderRadius:40}}>
            <Card.Title title="Result Of My New Application" subtitle="See My Application From Cendikia"/>
            <Card.Cover source={require('../asset/card33.jpg')} />
            <Card.Actions>
              <Button onPress={() => this.props.navigation.navigate('Pengumumanapply')}  >See Now </Button>
            </Card.Actions>
          </Card>
        </View>
        <View>
          <Card style={{margin: 20, padding: 20,borderRadius:40}}>
            <Card.Title title="Financial" subtitle="See The Financial" />
            <Card.Cover source={require('../asset/card20.jpg')} />
            <Card.Actions>
              <Button onPress={() => this.props.navigation.navigate('Financial')} >Peep Now</Button>
            </Card.Actions>
          </Card>
        </View>
        <View>
          <Card style={{margin: 20, padding: 20, borderRadius:40}}>
            <Card.Title title="My Profile" subtitle="Information About Me" />
            <Card.Cover source={require('../asset/profile.jpg')} />
            <Card.Actions>
              <Button onPress={() => this.props.navigation.navigate('Profile')} >See</Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

export default Home;
