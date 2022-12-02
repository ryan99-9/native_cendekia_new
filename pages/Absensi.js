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
      nama_siswa: "",
      nama_pengajar:"",
      id_pengajar:0,
      id_siswa:0,
      nama_orangtua:"",
      regional:"",
      durasi_lembur:0,
      biaya_fotokopi:0,
      tagihan_siswa:0,
      biaya_pendaftaran:0,
      fee_pengajar:0,
      realisasi_tagihan_siswa:0,
      realisasi_fee_pengajar:0,
      realisasi_biaya_pendaftaran:0,
      token:"",
    };
  }
  componentDidMount(){
    AsyncStorage.getItem('token',(err,res)=>{
        this.setState({token:res})
    })
  }
  onAdd = () => {
    let tambahbiaya = {
      id_pengajar : this.state.id_pengajar,id_siswa : this.state.id_siswa, nama_pengajar : this.state.nama_pengajar, nama_siswa : this.state.nama_siswa,
      nama_orang_tua : this.state.nama_orangtua,
      regional : this.state.regional,
      durasi_lembur : this.state.durasi_lembur,
      biaya_fotokopi : this.state.biaya_fotokopi,
      tagihan_siswa : this.state.tagihan_siswa,
      biaya_pendaftaran : this.state.biaya_pendaftaran,
      fee_pengajar : this.state.fee_pengajar,
      realisasi_tagihan_siswa : this.state.realisasi_tagihan_siswa,
      realisasi_biaya_pendaftaran : this.state.realisasi_biaya_pendaftaran,
      realisasi_fee_pengajar : this.state.realisasi_fee_pengajar,
    }
    if( tambahbiaya.regional.length===0||tambahbiaya.id_pengajar ===0||tambahbiaya.nama_orang_tua.length===0||tambahbiaya.id_siswa===0||tambahbiaya.nama_pengajar.length===0||tambahbiaya.nama_siswa.length===0){return alert('Semua data harus di isi, jika tidak ada tuliskan 0')}
    Axios.post(`https://admin.menujudigital.com/api/biaya`, tambahbiaya, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      }
    }) .then((res) => {
      console.log(res.data)
      alert('presensi sudah di submit')
      this.props.navigation.navigate('HOME')}).catch(err =>{alert('isi data dengan benar')})
  }
  render() {
    return (
      <ScrollView>
        <Text style={{fontSize:14,textAlign:'center',padding:10,marginTop:20,fontWeight:'bold',color:'#8E220D'}}>PRESENSI SETELAH KEPENGAJARAN</Text>
        <View style={{width: '100%', height: '100%',  alignItems: 'center', padding: 10, marginTop: '2%',}}>
            <View style={{ borderColor:'#8E220D', borderWidth:1, width:'100%', alignItems:'center', padding:20}}>
          <TextInput onChangeText={nama_siswa=>this.setState({nama_siswa})} label="Nama Siswa" mode="outlined" placeholder="tuliskan nama" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={nama_orangtua=>this.setState({nama_orangtua})} label="Nama Orang Tua" mode="outlined" placeholder="tuliskan nama" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={id_siswa=>this.setState({id_siswa})} label="Id Siswa" mode="outlined" placeholder="tuliskan nama" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}} />
          <TextInput onChangeText={nama_pengajar=>this.setState({nama_pengajar})} label="Nama Pengajar" mode="outlined" placeholder="tuliskan nama" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={id_pengajar=>this.setState({id_pengajar})} label="Id Pengajar" mode="outlined" placeholder="tuliskan id pengajar" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={regional=>this.setState({regional})} label="Regional" mode="outlined" placeholder="tuliskan regional" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={biaya_fotokopi=>this.setState({biaya_fotokopi})} label="Biaya Fotokopi" mode="outlined" placeholder="tuliskan biaya fotokopi" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
          <TextInput onChangeText={durasi_lembur=>this.setState({durasi_lembur})} label="Durasi Lembur" mode="outlined" placeholder="tuliskan jika lembur" outlineColor='#8E220D'  activeOutlineColor='#8E220D' placeholderTextColor='#8E220D' style={{width: '90%', justifyContent: 'center', marginBottom: 10}}/>
           <TouchableOpacity
            style={{ width: '90%', borderColor:'#8E220D', borderWidth:1,justifyContent: 'center', alignItems: 'center',  marginTop:30, padding: 10,  borderRadius: 20, backgroundColor: '#8E220D'}}
            onPress={this.onAdd} >
            <Text style={{color:'white'}}>Submit Presence</Text></TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

export default Home;
