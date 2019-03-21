import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  Alert
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
  H1,
  Fab,
  Spinner
} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
//import { ImagePicker, Permissions, Camera, Constants} from "expo";

import { AsyncStorage } from "react-native";

import ImagePicker from "react-native-image-crop-picker";

  export default class Konter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcImage: "",
      srcImage2: "",
      srcImage3: "",
      srcImage4: "",
      fileName: "",
      loading: false,
      nama: "",
      status: "Final",
      no_telp1: "",
      lebar: "",
      panjang: "",
      lebar_jalan: "",
      alamat_konter: "",
      initialPosition: {
        latitude: 0,
        longitude: 0
      },
    };
    
   
  }
  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long
        };
        this.setState({
          initialPosition: initialRegion
        });
      },
      error => alert(JSON.stringify(error)),
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
      }
    );
    //Watch Position
    /*this.watchID = navigator.geolocation.watchPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long
        };
        this.setState({
          initialPosition: initialRegion
        });
      } );*/
  }

  //Oper data Ke Parent
  Input = () => {
    let Data = {
      nama: this.state.nama,
      status: "Final",
      no_telp1: this.state.no_telp1,
      lebar: this.state.lebar,
      panjang: this.state.panjang,
      lebar_jalan: this.state.lebar_jalan,
      srcImage: this.state.srcImage,
      srcImage2: this.state.srcImage2,
      srcImage3: this.state.srcImage3,
      srcImage4: this.state.srcImage4,
      alamat_konter: this.state.alamat_konter,
      longitude: this.state.initialPosition.longitude,
      latitude: this.state.initialPosition.latitude
    };
        //validasi jika ada data yang kosong
      if(this.state.nama.trim() != "" && 
      this.state.alamat_konter.trim() != "" && 
      this.state.lebar.trim() != "" && 
      this.state.lebar_jalan.trim() != "" &&
      this.state.no_telp1.trim() !=  "" &&
      this.state.panjang.trim() != "" &&
      this.state.srcImage != "" &&
      this.state.srcImage2 != "" &&
      this.state.srcImage3 != "" &&
      this.state.srcImage4 != "")
   {
    alert("data Konter telah tersimpan");
    this.props.Kirim2(Data);
      
   }else{
    alert('Data tidak boleh Kosong')
   }
    this.setState({
      srcImage: "",
      srcImage2: "",
      srcImage3: "",
      srcImage4: "",
      fileName: "",
      nama: "",
      status: "",
      no_telp1: "",
      lebar: "",
      panjang: "",
      lebar_jalan: "",
      alamat_konter: ""
    });
   
  };
  
  
    
  _ImagePicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
      forceJpg: true,
      cropping:true
      
    }).then(image => {
      //1
      if (this.state.srcImage == "" ) {
        this.setState({
          srcImage: image.data
        });
        console.log("Image1:" + this.state.srcImage);
        //2
      } else if (this.state.srcImage2 == "" ) {
        this.setState({
          srcImage2: image.data
        });
        console.log("Image2:" + this.state.srcImage2);
        //3
      } else if (this.state.srcImage3 == "" ) {
        this.setState({
          srcImage3: image.data
        });
        console.log("Image3:" + this.state.srcImage3);
        //4
      } else if (this.state.srcImage4 == "" ) {
        this.setState({
          srcImage4: image.data
        });
        console.log("Image4:" + this.state.srcImage4);
      }
    });
  };
 
  render() {
    /* let { srcImage } = this.state;
    let Gambar = srcImage ? `data:image/jpg;base64,${srcImage.base64}` : null;
    Gambar && console.log({ uri: Gambar.slice(0, 100) });*/
    
    return (
      <Container style={{ backgroundColor: "#BDBDBD" }}>
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
            Konter
          </H1>
          <Text>{this.state.initialPosition.latitude}</Text>
          <Text>{this.state.initialPosition.longitude}</Text>
          <Content>
            <Card style={styles.Card}>
              <CardItem style={styles.header}>
                <Text>Nama pemilik bangunan </Text>
                <TextInput
                  style={styles.inputtext}
                  placeholder="Nama pemilik bangunan"
                  placeholderTextColor="#BDBDBD"
                  onChangeText={nama => this.setState({ nama })}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Nomor Telepon </Text>
                <TextInput
                  style={styles.inputtext}
                  placeholder="Nomor Telepon "
                  placeholderTextColor="#BDBDBD"
                  keyboardType="phone-pad"
                  onChangeText={no_telp1 => this.setState({ no_telp1 })}
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Alamat </Text>
                <TextInput
                  style={styles.inputtext}
                  placeholder="Masukkan Jalan,Nomor,RT/RW "
                  placeholderTextColor="#BDBDBD"
                  onChangeText={alamat_konter =>
                    this.setState({ alamat_konter })
                  }
                />
              </CardItem>
              <CardItem style={styles.header}>
                <Text>Lokasi </Text>
                <Button
                  iconLeft
                  warning
                  onPress={() => this.props.navigation.navigate("Map")}
                >
                  <Icon name="map" />
                  <Text>Location</Text>
                </Button>
              </CardItem>
              <CardItem style={styles.header}>
                <Text>Gambar dari bangunan </Text>
                <Button
                  iconLeft
                  warning
                  onPress={this._ImagePicker.bind(this)}
                >
                  <Icon name="camera" />
                  <Text>Pictures</Text>
                </Button>

                {this.state.srcImage != "" && (
                 <View>
                 <Button style={{marginLeft:20}} onPress={()=>{
                      this.setState({srcImage:''})
                    }} >
                      <Text>Hapus</Text>
                    </Button>
                    <Image
                      accessible={true}
                      importantForAccessibility="yes"
                      style={{ width: 200, height: 100, padding: 20 }}
                      source={{
                        uri: `data:image/jpeg;base64,${this.state.srcImage}`
                      }}
                    />
                   
                    </View>
                )}
                {this.state.srcImage2 != "" && (
                  <View>
                  <Button onPress={()=>{
                      this.setState({srcImage2:''})
                    }} >
                      <Text>Hapus</Text>
                    </Button>
                  <Image
                    style={{ padding: 20, width: 200, height: 100 }}
                    source={{
                      uri: `data:image/jpeg;base64,${this.state.srcImage2}`
                    }}
                  />
                 
                  </View>
                )}
                {this.state.srcImage3 != "" && (
                  <View>
                  <Button onPress={()=>{
                      this.setState({srcImage3:''})
                    }} >
                      <Text>Hapus</Text>
                    </Button>
                  <Image
                    style={{ width: 200, height: 100, padding: 20 }}
                    source={{
                      uri: `data:image/jpeg;base64,${this.state.srcImage3}`
                    }}
                  />
               
                  </View>
                )}
                {this.state.srcImage4 != "" && (
                  <View>
                  <Button onPress={()=>{
                      this.setState({srcImage4:''})
                    }} >
                      <Text>Hapus</Text>
                    </Button>
                  <Image
                    style={{ width: 200, height: 100, padding: 20 }}
                    source={{
                      uri: `data:image/jpeg;base64,${this.state.srcImage4}`
                    }}
                  />
               
                  </View>
                )}
              </CardItem>
              <CardItem style={styles.header}>
                <Text>Panjang Bangunan </Text>
                <TextInput
                  onChangeText={panjang => this.setState({ panjang })}
                  style={styles.inputtext}
                  keyboardType="numeric"
                  placeholder="Panjang Bangunan "
                  placeholderTextColor="#BDBDBD"
                />
              </CardItem>

              <CardItem style={styles.header}>
                <Text>Lebar Bangunan </Text>
                <TextInput
                  onChangeText={lebar => this.setState({ lebar })}
                  style={styles.inputtext}
                  placeholder="Lebar Bangunan  "
                  keyboardType="numeric"
                  placeholderTextColor="#BDBDBD"
                />
              </CardItem>
              <CardItem style={styles.header}>
                <Text>Lebar Jalan Depan </Text>
                <TextInput
                  style={styles.inputtext}
                  placeholder="Lebar Jalan Depan"
                  keyboardType="numeric"
                  placeholderTextColor="#BDBDBD"
                  onChangeText={lebar_jalan => this.setState({ lebar_jalan })}
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
//Map
import MapBox from '@mapbox/react-native-mapbox-gl'
MapBox.setAccessToken('pk.eyJ1IjoidGVnYXIzMSIsImEiOiJjanNiNGY1cjMwNWpzNDRqbjF5cjZ5ajluIn0.RJUPWgd5UruOO1_27bkO7A')
class Map extends React.Component{
  constructor(props) {
    super(props)
    this.state={
    initialPosition: {
      latitude: 0,
      longitude: 0
    },
  }
  }
  
   

  render(){
   return(
     <View style={{flex:1}}>
     <MapBox.MapView
     styleURL={'mapbox://styles/tegar31/cjsb59fab0s871fpkfvfkcetm'}
       zoomLevel={12}
         centerCoordinate={[this.state.initialPosition.latitude,this.state.initialPosition.longitude]}
       />
     </View>
   )
  }
}
/*const AppNavigator = createStackNavigator(
  {
    Map:Map,
    Konter: Konter,
   
  },
  {
    initialRouteName: "Konter",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default createAppContainer(AppNavigator);*/

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ffeead"
  },
  header1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
