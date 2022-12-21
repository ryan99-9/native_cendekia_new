import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"", notify:"", email_user:"",
      //data pengajar yang ingin ditampilkan sesuai id login
      id:null,email:"",nama_pengajar:"",asal_kampus:"",no_telp:"",mapel:"",nama_bank:"",rek_bank:"",an_rek_bank:"",

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
            this.setState({id:item.id}),this.setState({nama_pengajar:item.nama_pengajar}),this.setState({email:item.email}),
          this.setState({asal_kampus:item.asal_kampus}),this.setState({no_telp:item.no_telp}),this.setState({mapel:item.mapel}),
        this.setState({nama_bank:item.nama_bank}),this.setState({rek_bank:item.rek_bank}),this.setState({an_rek_bank:item.an_rek_bank})}
        })
      })
    })
  }
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../asset/side1.jpg')}
          style={{width:'100%',height:'100%',resizeMode:'cover'}}
        >
          <View style={{height:'100%',width:'100%',paddingStart:30,paddingEnd:2}} >
            <Text style={{marginLeft:0,fontSize:30,color:'white',fontWeight:'bold', textAlign:'left',marginBottom:0,marginTop:100}} >
              About Me </Text>
              <View style={{width:'100%'}}>
              <DataTable style={{marginLeft:-20,padding:0,marginTop:40,width:'100%'}}>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> Id Pengajar</Text></DataTable.Cell>
              <DataTable.Cell><Text style={styles.textRow}>{this.state.id}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> Nama </Text></DataTable.Cell>
              <DataTable.Cell><Text style={styles.textRow}>{this.state.nama_pengajar}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> Email </Text></DataTable.Cell>
              <DataTable.Cell textStyle={{writingDirections :'ltr'}} ><Text style={styles.textRow}>{this.state.email}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> Asal Kampus </Text></DataTable.Cell>
              <DataTable.Cell><Text style={styles.textRow}>{this.state.asal_kampus}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> Mapel </Text></DataTable.Cell>
              <DataTable.Cell ><Text style={styles.textRow}>{this.state.mapel}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> No Telp </Text></DataTable.Cell>
              <DataTable.Cell><Text style={styles.textRow}>{this.state.no_telp}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> Bank </Text></DataTable.Cell>
              <DataTable.Cell><Text style={styles.textRow}>{this.state.nama_bank}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> No Rekening </Text></DataTable.Cell>
              <DataTable.Cell><Text style={styles.textRow}>{this.state.rek_bank}</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={styles.textHeader}> An Rek </Text></DataTable.Cell>
              <DataTable.Cell><Text style={styles.textRow}>{this.state.an_rek_bank}</Text></DataTable.Cell>
            </DataTable.Row>
          </DataTable>
              </View>
          </View> 
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textHeader: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textRow: {
    color: "white",
    fontSize: 16,
    // fontWeight: "bold",
    textAlign: "center"}
});
export default Home;
