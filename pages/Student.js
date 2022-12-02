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
      id_siswa:[],
      number:null,
      //data siswa yang ditampilkan 
      data_siswa:[],
      //jika belum ada siswa
      standart:false
    };
  }
  //agar punya ide khusus ketika di klik
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
          arr.push(Number(item.id_siswa))
          this.setState({id_siswa:arr})
          console.log(`id siswa : ${item.id_siswa}`) 
          // console.log(`data array id siswa1 : ${this.state.id_siswa[0]}`)
          //jika isi 1 dan jika isi >1 memiliki metode memanggil data yang berbeda //jika 0 otomatis error, jika 1 langsung dipanggil, jika >1 harus di map
          //Menemukan true false
          console.log(typeof this.state.id_siswa.map(x=>{return x}));
          console.log(`datanya : ${this.state.id_siswa.map(x=>{return x})}`);
          console.log(`Validasi : ${Boolean(this.state.id_siswa.map(x=>{return x}).length!==0)}`)

          AsyncStorage.getItem('token',(err,res)=>{ 
            Axios.get(`https://admin.menujudigital.com/api/dataortusiswa/${this.state.id_siswa.map(x=>{return x}).length!==0?this.state.id_siswa.map(x=>{return x}):0}`,{headers: {
              Authorization: `Bearer ${res}`
            }}).then((res) =>{ 
              console.log(typeof res.data) // type data yang dihasilkan
              console.log(res.data) //data nya
              arr2.push(res.data) // push
              this.setState({data_siswa:arr2}) //bentuknya jadi array 
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
        {/* { console.log(`data array id siswa2 : ${this.state.id_siswa[0]}`)} */}
        {/* {console.log(`data siswa : ${this.state.data_siswa.map(x=>{return x.alamat})}`)} */}
        <ImageBackground
          source={require('../asset/Iklan2.jpg')}
          style={{width:'100%',height:'100%',resizeMode:'cover'}}>
            <ScrollView style={{height:'100%',width:'100%',paddingStart:20,paddingEnd:2,marginTop:20}}>
            <List.Section title='Siswa Anda' 
            titleStyle={{marginTop:70,textAlign:'center',color:'#628E90',fontSize:30,fontWeight:'bold'}}>
            {this.state.id_siswa.map(x=>{return x}).length!==0? this.state.data_siswa.map((item,index)=>{
                return (
            <List.Accordion key={index}
                title={item.nama_siswa}
                titleStyle={{color:'#665A48',fontSize:20,fontWeight:'bold'}}
                expanded={index === this.state.number?true:false }
                right={props => <></>}
                onPress={()=>this.handlePress(index)}>
                 <DataTable>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Id Siswa</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.id}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Nama Orang Tua</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.nama_orangtua}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Kelas </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.kelas}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Alamat </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.alamat},{item.kecamatan},{item.kota}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Regional </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.regional}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Hp </Text></DataTable.Cell>
                <DataTable.Cell ><Text style={styles.textRow}>{item.no_telp}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> email </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.email}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Jadwal Les </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.jadwal_les}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                <DataTable.Cell><Text style={styles.textHeader}> Mapel </Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.textRow}>{item.mapel}</Text></DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            </List.Accordion>
                )
            }):<Text style={{color:'#665A48',fontSize:20,fontWeight:'bold'}} >Anda Belum Memiliki Siswa</Text>}
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
