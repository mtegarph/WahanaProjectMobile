import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from "react-native";
import {
  Textarea,
  Container,
  Icon,
  Button,
  Header,
  Content,
  Item,
  Input,
  Form,
  Tab,
  TabHeading,
  Text,
  Label,
  DatePicker,
  Card,
  CardItem,
  Body,
  H1
} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { AsyncStorage } from "react-native";
import Konter from "./Konter";
import Main from "../../App";
export default class FormLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      chosenDate: "",
      nama: "",
      umur: "",
      tmpt_lahir: "",
      no_telp: "",
      no_hp: "",
      alamat_diri: "",
      kelurahan: "",
      kodepos: "",
      no_identitas: "",
      tgl_pengisian: "",
      Nama: "",
      Umur: "",
      Tmpt_Lahir: "",
      No_Telp: "",
      No_Hp: "",
      Alamat_Diri: "",
      Kelurahan: "",
      KodePos: "",
      No_Identitas: "",
      Tanggal_Lahir: "",
      Tgl_Pengisian: ""
    };
    

  }
  //Oper data Ke Parent
  Input=()=>{
    let Data = {
      Email:this.state.Email,
      nama:this.state.nama,
      umur: this.state.umur,
      tmpt_lahir: this.state.tmpt_lahir,
      no_telp: this.state.no_telp,
      no_hp: this.state.no_hp,
      alamat_diri: this.state.alamat_diri,
      kelurahan: this.state.kelurahan,
      kodepos: this.state.kodepos,
      no_identitas: this.state.no_identitas,
      tanggal_lahir:this.state.chosenDate,
      kecamatan: this.state.kecamatan
    }
       //validasi jika ada data yang kosong
       if(this.state.Email.trim() != "" && 
       this.state.nama.trim() != "" && 
       this.state.umur.trim() != "" && 
       this.state.tmpt_lahir.trim() != "" &&
       this.state.no_telp.trim() !=  "" &&
       this.state.no_hp.trim() != "" &&
       this.state.alamat_diri.trim() != "" &&
       this.state.kelurahan.trim() != "" &&
       this.state.kodepos.trim() != "" &&
       this.state.no_identitas.trim() != "" &&
       this.state.Card != "" && 
       this.state.kecamatan.trim() != "")
    {
      this.props.Kirim(Data)
      alert('Data personal telah tersimpan')
       
    }else{
     alert('Data tidak boleh Kosong')
    }
    
    this.setState({
      kecamatan:'',
      Email:'',
      chosenDate: "",
      nama: "",
      umur: "",
      tmpt_lahir: "",
      no_telp: "",
      no_hp: "",
      alamat_diri: "",
      kelurahan: "",
      kodepos: "",
      no_identitas: "",
      tgl_pengisian: "",
     
    })
  }
  
  
  handlePicker = date => {
    this.setState({
      isVisible: false,
      chosenDate: moment(date).format(" MMMM Do YYYY ")
    });
  };

  hidePicker = () => {
    this.setState({
      isVisible: false
    });
  };
  showPicker = () => {
    this.setState({
      isVisible: true
    });
  };
  render() {
    
    return (
      <Container style={{ backgroundColor: "#BDBDBD" }}>
     
        <Konter data={this.state.nama} />
        {this.state.loading === true && (
          <Modal
            animationType="none"
            visible={this.state.loading}
            onRequestClose={() => {
              alert("Modal Close");
            }}
          >
            <ActivityIndicator animating={true} size="large" />
          </Modal>
        )}
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          extraHeight={Platform.select({ android: 300 })}
        >
          <H1 style={styles.title} textBreakStrategy="highQuality">
            Personal
          </H1>
          <Text>{this.state.Email}</Text>

          <Content>
            <Card style={styles.Card}>
            <CardItem style={styles.header}>
                <Text>Email </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Nama Lengkap"
                  onChangeText={data => this.setState({ Email: data })}
                />
              </CardItem>
              <CardItem style={styles.header}>
                <Text>Nama </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Nama Lengkap"
                  onChangeText={data => this.setState({ nama: data })}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Umur </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Umur "
                  keyboardType="numeric"
                  onChangeText={data => this.setState({ umur: data })}
                />
              </CardItem>

              <CardItem style={styles.header1}>
                <Text>
                  tanggal Lahir:
                  <Text style={styles.result}>{this.state.chosenDate}</Text>
                </Text>
                <TouchableOpacity onPress={this.showPicker}>
                  <Icon name="browsers" />
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlePicker}
                  onCancel={this.hidePicker}
                  mode={"date"}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Tempat Lahir </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Tempat lahir "
                  onChangeText={data => this.setState({ tmpt_lahir: data })}
                />
              </CardItem>
              <CardItem style={styles.header}>
                <Text>Nomor HandPhone </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Nomor HandPhone "
                  keyboardType="phone-pad"
                  onChangeText={data => this.setState({ no_hp: data })}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Nomor Telepon </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Nomor Telepon "
                  keyboardType="phone-pad"
                  onChangeText={data => this.setState({ no_telp: data })}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Alamat </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Masukkan Jalan,Nomor,RT/RW "
                  onChangeText={data => this.setState({ alamat_diri: data })}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Kecamatan </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  onChangeText={data => this.setState({ kecamatan: data })}
                  style={styles.inputtext}
                  placeholder="Kecamatan "
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Provinsi </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  onChangeText={data => this.setState({ kelurahan: data })}
                  style={styles.inputtext}
                  placeholder="Provinsi "
                />
              </CardItem>
              <CardItem style={styles.header}>
                <Text>Kode Pos </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Kode Pos "
                  keyboardType="numeric"
                  onChangeText={data => this.setState({ kodepos: data })}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Nomor KTP </Text>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  style={styles.inputtext}
                  placeholder="Nomor KTP "
                  keyboardType="numeric"
                  onChangeText={data => this.setState({ no_identitas: data })}
                />
              </CardItem>
              <CardItem style={styles.header1}>
                <Button iconLeft warning onPress={this.Input.bind(this)}>
                  <Icon name="send" />
                  <Text>Draft</Text>
                </Button>
              </CardItem>
            </Card>
          </Content>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ffeead"
  },
  Card: {
    padding: 10,
    backgroundColor: "#ffeead",
    borderRadius: 10
  },
  inputtext: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#333",
    color: "#BDBDBD",
    borderRadius: 5
  },
  header1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#ffeead"
  },
  result: {
    color: "#BDBDBD",
    fontStyle: "italic",
    fontFamily: "Roboto"
  },
  title: {
    margin: 10,
    alignSelf: "center",
    padding: 10,
    fontFamily: "Zocial",
    borderBottomColor: "#ffeead",
    borderBottomWidth: 1
  }
});
