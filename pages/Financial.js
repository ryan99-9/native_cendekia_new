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
      id_biaya:[],
      number:null,
      //data mengajar yang ingin ditampilkan
      data_ajar:[],
    };
  }
  handlePress = (index) => {this.setState({number:index}),console.log(`index ${index}`);} 
  componentDidMount(){
    var arr =[]
    var arr2=[]
    //id User
    AsyncStorage.getItem('idpengajar',(err,res)=>{
      this.setState({id_pengajar:res});
      console.log(`Id Pengajar : ${res}`);
    })
    //Ambil data siswa yang diajar (api biaya, api data pengajar, api data siswa)
    AsyncStorage.getItem('token',(err,res)=>{
      Axios.get(`https://admin.menujudigital.com/api/biaya`,{headers: {
        Authorization: `Bearer ${res}`
      }}).then(res =>{
        res.data.map(item=>{
          if(item.id_pengajar === this.state.id_pengajar) 
          {
          arr.push(Number(item.id))
          this.setState({id_biaya:arr})
          console.log(`id biaya : ${item.id_biaya}`) 
          // console.log(`data array id siswa1 : ${this.state.id_siswa[0]}`)
          //jika isi 1 dan jika isi >1 memiliki metode memanggil data yang berbeda //jika 0 otomatis error, jika 1 langsung dipanggil, jika >1 harus di map
          //Menemukan true false
          console.log(typeof this.state.id_biaya.map(x=>{return x}))
          console.log(`datanya : ${this.state.id_biaya.map(x=>{return x})}`)
          console.log(`Validasi : ${Boolean(this.state.id_biaya.map(x=>{return x}).length!==0)}`)

          AsyncStorage.getItem('token',(err,res)=>{ 
            Axios.get(`https://admin.menujudigital.com/api/biaya/${this.state.id_biaya.map(x=>{return x}).length!==0?this.state.id_biaya.map(x=>{return x}):0}`,{headers: {
              Authorization: `Bearer ${res}`
            }}).then((res) =>{ 
              console.log(typeof res.data) // type data yang dihasilkan
              console.log(res.data) //data nya
              arr2.push(res.data) // push
              this.setState({data_ajar:arr2}) //bentuknya jadi array 
          }).catch(err => console.log(`err`))
          })
        }
        })
      })
    })
    
  }
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../asset/Iklan2.jpg')}
          style={{width:'100%',height:'100%',resizeMode:'cover'}}>
            <ScrollView style={{height:'100%',width:'100%',paddingStart:20,paddingEnd:2,marginTop:20,marginBottom:50}}>
            <List.Section title='Data Kepengajaran' 
            titleStyle={{marginTop:70,textAlign:'center',color:'#628E90',fontSize:30,fontWeight:'bold'}}>
            {this.state.id_biaya.map(x=>{return x}).length!==0?this.state.data_ajar.map((item,index)=>{
                return (
            <List.Accordion key={index}
                title={item.created_at.slice(0,10)}
                titleStyle={{color:'#665A48',fontSize:20,fontWeight:'bold',marginLeft:20}}
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
                <DataTable.Cell><Text style={styles.textRow}>{item.nama_orang_tua}</Text></DataTable.Cell>
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
                <DataTable.Cell><Text style={styles.textHeader}> Durasi Lembur </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.durasi_lembur}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Fee Pengajar </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.fee_pengajar}</Text></DataTable.Cell>
                </DataTable.Row>
                {/* <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Realisasi Fee Pengajar </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.realisasi_fee_pengajar}</Text></DataTable.Cell>
                </DataTable.Row> */}
            </DataTable>
            </List.Accordion>
             )
            }) :<Text>Anda Belum Melaksanakan Kepengajaran</Text>}
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
