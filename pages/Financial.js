import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  StyleSheet
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable, List } from 'react-native-paper';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      id_pengajar:"",
      id:[],
      number:null,
      //data mengajar yang ingin ditampilkan
      data_ajar:[],
    };
  }


  handlePress = (index) => {this.setState({number:index}),console.log(`index ${index}`);} 
  componentDidMount(){
    AsyncStorage.getItem('id',(err,res)=>{
      this.setState({id_pengajar:res});
      console.log(`Id Pengajar : ${res}`);
    })
    //Seleksi id mengajar yang ada id pengajar x nya . . . 
    AsyncStorage.getItem('token',(err,res)=>{
      Axios.get(`https://admin.menujudigital.com/api/biaya`,{headers: {
        Authorization: `Bearer ${res}`
      }}).then(res =>{
        res.data.map(item=>{
          if(item.id_pengajar === this.state.id_pengajar)
          {this.setState({id:item.id})}
        })
      })
    })
    AsyncStorage.getItem('token',(err,res)=>{
        Axios.get(`https://admin.menujudigital.com/api/biaya/${this.state.id.map(x=>{return x})}`,{headers: {
          Authorization: `Bearer ${res}`
        }}).then((res) =>{ console.log(res.data), this.setState({data_ajar:res.data})
        })
      })
  }
  
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../asset/Iklan2.jpg')}
          style={{width:'100%',height:'100%',resizeMode:'cover'}}>
            <ScrollView style={{height:'100%',width:'100%',paddingStart:20,paddingEnd:2,marginTop:20}}>
            <List.Section title='Data Kepengajaran' 
            titleStyle={{marginTop:70,textAlign:'center',color:'#628E90',fontSize:30,fontWeight:'bold'}}>
            {this.state.data_ajar.map((item,index)=>{
                return (
            <List.Accordion key={index}
                title={item.created_at}
                titleStyle={{color:'#665A48',fontSize:20,fontWeight:'bold'}}
                expanded={index === this.state.number?true:false }
                right={props => <></>}
                onPress={()=>this.handlePress(index)}>
                 <DataTable>
                 <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Id Siswa </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.id_siswa}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Nama Siswa </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.nama_siswa}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Nama Orang Tua </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.nama_orangtua},{item.kecamatan},{item.kota}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Regional </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.regional}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Biaya Fotokopi </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.biaya_fotokopi}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Fee Pengajar </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.fee_pengajar}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Realisasi Fee Pengajar </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.realisasi_fee_pengajar}</Text></DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            </List.Accordion>
                )
            })}
            </List.Section>
            </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    textHeader: {
      color: "#AA8B56",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    textRow: {
      color: "#749F82",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    }
  });
export default Home;
