import React from "react";
import {
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
  Tabs,
  Body,
  Label,
 
  Toast,
  Fab,
  Footer,
  Left,
  Right
} from "native-base";
import { Modal, Image, Alert, AsyncStorage,BackHandler,ActivityIndicator } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Personal from "./src/app/Personal";
import Konter from "./src/app/Konter";
var utf8 = require("utf8");
var binaryToBase64 = require("binaryToBase64");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      error: "",
      loading: false
    };
  }
  async onRegisterPress() {
    console.log("Proses Register");
    this.setState({ loading: true });
    try {
      let response = await fetch(
        "https://magang.wahana.com/datakonter/index.php/signupapi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.Email,
            password: this.state.password
          })
        }
      );
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Success
        this.setState({ loading: false });
        this.setState({ error: "" });
        let jwt = res;
        console.log("res Success is :" + jwt);
        this.props.navigation.navigate("LogIn");
      } else {
        //Error
        this.setState({ loading: false });
        console.log(response.status + "" + response.statusText);
        let error = res;
        throw error;
      }
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ error: error });
      alert("error" + error);
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Form
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              alignSelf: "center",
              flexDirection: "column",
              paddingTop: 100
            }}
          >
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
            <Item style={{ borderBottomWidth: 0 }}>
              <Image
                style={{
                  padding: 30,
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginRight: 20,
                  marginTop: 20
                }}
                source={require("./src/image/WahanaTrans.png")}
              />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                keyboardType="email-address"
                onChangeText={data => this.setState({ Email: data })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={data => this.setState({ password: data })}
              />
            </Item>
          </Form>

          <Button
            style={{ padding: 150, margin: 20 }}
            warning
            onPress={this.onRegisterPress.bind(this)}
          >
            <Label style={{ color: "white" }}>Sign Up </Label>
          </Button>
        </Content>
      </Container>
    );
  }
}

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      loading: false,
      password: "",
      error: ""
    };
  }
  async Encode() {
    const Text = this.state.Password;
    var byte = utf8.encode(Text);
    var encoded = binaryToBase64(byte);
    this.setState({ password: encoded });
    console.log(encoded);
  }
  async onLoginPress() {
    await this.Encode;
   this.setState({ loading: true });
    try {
      let response = await fetch(
        "https://magang.wahana.com/datakonter/index.php/loginapi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.Email,
            password: this.state.password
          })
        }
      );
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Success
        this.setState({ loading: false });
        this.setState({ error: "" });
        let jwt = res;
        alert("res Token :" + jwt);
        let token = JSON.parse(jwt)
        this.props.navigation.navigate("Main", {
          Email: this.state.Email,
          token: token
        });
      } else {
        //Error
        this.setState({ loading: false });
        console.log(response.status + "" + response.statusText);
        let error = res;
        throw error;

      }
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ error: error });
      alert("error" + error);
    }
  }

  render() {
  

    return (
      <Container>
        <Content>
          <Form
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              alignSelf: "center",
              flexDirection: "column",
              paddingTop: 100
            }}
          >
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
            <Item style={{ borderBottomWidth: 0 }}>
              <Image
                style={{
                  padding: 30,
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginRight: 20,
                  marginTop: 20
                }}
                source={require("./src/image/WahanaTrans.png")}
              />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={this.state.Email}
                keyboardType="email-address"
                onChangeText={data => this.setState({ Email: data })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={data => this.setState({ password: data })}
              />
            </Item>
          </Form>

          <Button
            style={{ padding: 150, margin: 10,flex:1,justifyContent: "flex-end", alignItems: "center",alignSelf:'center' }}
            warning
            onPress={this.onLoginPress.bind(this)}
          >
            <Label style={{ color: "white" }}>Log in </Label>
          </Button>
          <Button
          warning
            onPress={() => this.props.navigation.navigate("Register")}
            style={{  padding: 130, margin: 10 ,flex:1,flexDirection:'row',alignItems:'center', justifyContent: "flex-end",alignSelf:'center'}}
          >
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.navigation.getParam("token", ""),
      data_owner:this.props.navigation.getParam("Email", ""),
      error: "",
      Email: "",
      Nama: "",
      umur: "",
      tmpt_lahir: "",
      no_telp: "",
      no_hp: "",
      alamat_diri: "",
      provinsi: "",
      kodepos: "",
      no_identitas: "",
      tanggal_lahir: "",
      Berhasil1: "",
      Berhasil2: "",
      srcImage: "",
      srcImage2: "",
      srcImage3: "",
      srcImage4: "",
      nm_pml: "",
      status: "",
      no_telp1: "",
      lebar: "",
      panjang: "",
      lebar_jalan: "",
      alamat_konter: "",
      longitude: "",
      latitude: "",
      loading: false,
      kecamatan: "",
    };
    AsyncStorage.getItem("Data1", (error, result) => {
      let resultParsed = JSON.stringify(result);
      console.log(result)
      if (result) {
        this.setState({
          Email: resultParsed.Email,
          Nama: resultParsed.Nama,
          umur: resultParsed.umur,
          tmpt_lahir: resultParsed.tmpt_lahir,
          no_telp: resultParsed.no_telp,
          no_hp: resultParsed.no_hp,
          alamat_diri: resultParsed.alamat_diri,
          provinsi: resultParsed.provinsi,
          kodepos: resultParsed.kodepos,
          no_identitas: resultParsed.no_identitas,
          tanggal_lahir: resultParsed.tanggal_lahir,
          kecamatan: resultParsed.kecamatan,
          Berhasil1: resultParsed.Berhasil1,
        });
      }
    });
    AsyncStorage.getItem('Data2',(error,result) =>{
      let resultParsed = JSON.stringify(result);
      console.log(result)
      if (result) {
        this.setState({
      Berhasil2:resultParsed.Berhasil2,
      srcImage: resultParsed.srcImage,
      srcImage2: resultParsed.srcImage2,
      srcImage3: resultParsed.srcImage3,
      srcImage4: resultParsed.srcImage4,
      nm_pml: resultParsed.nm_pml,
      status: resultParsed.status,
      no_telp1: resultParsed.no_telp1,
      lebar: resultParsed.lebar,
      panjang: resultParsed.panjang,
      lebar_jalan: resultParsed.lebar_jalan,
      alamat_konter: resultParsed.alamat_konter,
      longitude: resultParsed.longitude,
      latitude: resultParsed.latitude,
        })
      }
    })
  }
  CallBack2(Data) {
    this.setState({
      Berhasil2: "masuk",
      srcImage: Data.srcImage,
      srcImage2: Data.srcImage2,
      srcImage3: Data.srcImage3,
      srcImage4: Data.srcImage4,
      nm_pml: Data.nama,
      status: Data.status,
      no_telp1: Data.no_telp1,
      lebar: Data.lebar,
      panjang: Data.panjang,
      lebar_jalan: Data.lebar_jalan,
      alamat_konter: Data.alamat_konter,
      longitude: Data.longitude,
      latitude: Data.latitude
    });
    console.log(Data)
    let data2 = {
      Berhasil2: "masuk",
      srcImage: Data.srcImage,
      srcImage2: Data.srcImage2,
      srcImage3: Data.srcImage3,
      srcImage4: Data.srcImage4,
      nm_pml: Data.nama,
      status: Data.status,
      no_telp1: Data.no_telp1,
      lebar: Data.lebar,
      panjang: Data.panjang,
      lebar_jalan: Data.lebar_jalan,
      alamat_konter: Data.alamat_konter,
      longitude: Data.longitude,
      latitude: Data.latitude
    };
    AsyncStorage.setItem("Data2", JSON.stringify(data2));
  }
  CallBack(Data) {
    this.setState({
      Email: Data.Email,
      Nama: Data.nama,
      umur: Data.umur,
      tmpt_lahir: Data.tmpt_lahir,
      no_telp: Data.no_telp,
      no_hp: Data.no_hp,
      alamat_diri: Data.alamat_diri,
      provinsi: Data.kelurahan,
      kodepos: Data.kodepos,
      no_identitas: Data.no_identitas,
      tanggal_lahir: Data.tanggal_lahir,
      Berhasil1: "Masuk",
      kecamatan: Data.kecamatan
    });
    console.log(Data)
    let data1 = {
      Email: Data.Email,
      Nama: Data.nama,
      umur: Data.umur,
      tmpt_lahir: Data.tmpt_lahir,
      no_telp: Data.no_telp,
      no_hp: Data.no_hp,
      alamat_diri: Data.alamat_diri,
      provinsi: Data.kelurahan,
      kodepos: Data.kodepos,
      no_identitas: Data.no_identitas,
      tanggal_lahir: Data.tanggal_lahir,
      Berhasil1: "Masuk",
      kecamatan: Data.kecamatan
    };
    AsyncStorage.setItem("Data1", JSON.stringify(data1));
  }
//handle back button untuk keluar dari aplikasi
  handleBackButton = () => {
    Alert.alert(
        'Exit App',
        'Apakah anda yakin?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
   } 
componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  async handlePress() {
    this.setState({ loading: true });

    try {
      let response = await fetch(
        "https://magang.wahana.com/datakonter/index.php/publicapi",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Email: this.state.Email,
            nama: this.state.Nama,
            umur: this.state.umur,
            tmpt_lahir: this.state.tmpt_lahir,
            no_telp: this.state.no_telp,
            no_hp: this.state.no_hp,
            alamat_diri: this.state.alamat_diri,
            provinsi: this.state.provinsi,
            kodepos: this.state.kodepos,
            no_identitas: this.state.no_identitas,
            tgl_lahir: this.state.tanggal_lahir,
            alamat_diri: this.state.alamat_diri,
            alamat_konter: this.state.alamat_konter,
            notelp_pml_bgn: this.state.no_telp1,
            lebar_bangunan: this.state.lebar,
            panjang_bangunan: this.state.panjang,
            lbr_jl_depan: this.state.lebar_jalan,
            kecamatan: this.state.kecamatan,
            gambar1: this.state.srcImage,
            gambar2: this.state.srcImage2,
            gambar3: this.state.srcImage3,
            gambar4: this.state.srcImage4,
            kordinat1: this.state.longitude,
            kordinat2: this.state.latitude,
            status: 'final',
            data_owner:this.state.data_owner,
            token:this.state.token.token
          })
        }
      );
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Success
        console.log(response.status + "" + response.statusText);
        // let jwt = res;
        this.setState({ loading: false });
        Alert.alert(
          JSON.stringify("Messages: Sukses"),
          JSON.stringify("Pilih"),
          [
            {
              text: JSON.stringify("Masuk Data lagi"),
              onPress: () => this.props.navigation.navigate("Main")
            },
            {
              text: JSON.stringify("Kembali"),
              onPress: () => this.props.navigation.navigate("LogIn")
            }
          ]
        );
        
      } else {
        //Error
        this.setState({ loading: false });
        console.log(response.status + "" + response.statusText);

        let error = res;
        throw error;
      }
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ error: error });
      alert("error:" + error);
    }
  }
  render() {
    console.log(this.state.data_owner)
    console.log(this.state.token.token)
    return (
      <Container>
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
        <Header>
          <Left>{this.state.Berhasil1 != "" && <Icon name="checkmark" />}</Left>

          <Button  style={{padding:20,margin:50,alignSelf:'center',alignItems:'center',justifyContent:'center'}} onPress={this.handlePress.bind(this)}>
            <Icon name="send" />
            <Text>Final</Text>
          </Button>
          <Right>
            {this.state.Berhasil2 != "" && <Icon name="checkmark" />}
          </Right>
        </Header>
        <Tabs>
          <Tab
            heading={
              <TabHeading
                tabStyle={{ backgroundColor: "red" }}
                activeTabStyle={{ backgroundColor: "green" }}
              >
                <Icon name="contact" />
                <Text>Personal</Text>
              </TabHeading>
            }
          >
            <Personal
              onRef={ref => (this.Kirim = ref)}
              Kirim={this.CallBack.bind(this)}
            />
          </Tab>

          <Tab
            heading={
              <TabHeading
                tabStyle={{ backgroundColor: "red" }}
                activeTabStyle={{ backgroundColor: "green" }}
              >
                <Icon name="home" />
                <Text>Store</Text>
              </TabHeading>
            }
          >
            <Konter
              onRef={ref => (this.Kirim2 = ref)}
              Kirim2={this.CallBack2.bind(this)}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    Main: Main,
    LogIn: LogIn,
    Konter: Konter,
    Personal: Personal,
    Register: Register
  },
  {
    initialRouteName: "LogIn",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default createAppContainer(AppNavigator);
