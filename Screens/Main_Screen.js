import React, {Component, useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {  SafeAreaView,  StyleSheet,  ScrollView,  View,  Text,  TextInput,  Image,  StatusBar, Modal,  Button,Dimensions, BackHandler, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import {firebaseDB} from '../src/config';
//--------------------  Custom  ---------------------------
import KTextInput from '../Components/KTextInput';
import KMainButton from '../Components/KMainButton';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// import auth from '@react-native-firebase/auth';


var namesRef = firebaseDB.ref('/users');
function Main_Screen({navigation}){
  const [RegisterVisible, setRegisterVisible] = useState(false);
  const [name, setName] = useState('');



  const onWatch = () => {
    console.log(name);
    navigation.navigate('xMapScreen');
  }

  const onRegister = () => {
    var id = DeviceInfo.getUniqueId();
    console.log(id);
    console.log(name);
    if(name == ""){
      Toast.show("Please input Name");
    }else{      
      namesRef.push({
        DeviceId : DeviceInfo.getUniqueId(),
        Name : name,
      }).then(() => {
        Alert.alert("SUCCESS!", "Please restart your app.");
        close_Register_Modal();
      }).catch(error => {
        Toast.show(error);
      });
    }
  }

  const onExit = () => {
    BackHandler.exitApp();
  }

  const open_Register_Modal = () => {
    var isnew = true;
    var name = "";
    namesRef.once('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.DeviceId.toString() == DeviceInfo.getUniqueId().toString())
          isnew = false;
          name = childData.Name;
      });
    }).then(() => {
      if(isnew == true){
        setRegisterVisible(true);
      }else{    
        Toast.show("Already exist as " + name);
      }
    });

  }

  const close_Register_Modal = () => {
    setRegisterVisible(false);
  }

  return ( 
    <LinearGradient colors={['#86b63e', '#96c44c','#add860','#bee76f', '#8db240']} style={styles.linearGradient}>
      <ScrollView style={styles.container}>
        <StatusBar hidden={true} />  
        <View style = {{alignItems : 'center', marginTop: '20%'}}  >
          <Image source={require('../assets/images/logo.png')} style = {{width: screenWidth * 0.9, height: screenWidth * 0.9}} />
        </View>

        {/* <View style = {{height: '20%'}}></View>           */}
        
        { RegisterVisible ?
        (<View style = {{flexDirection : 'column', justifyContent: 'center', marginTop: 20,  width : '80%', alignSelf: 'center', marginTop : '10%'}}>
          <KTextInput placeholder = "User Name" onChangeText = {name => setName(name)} />

          <View style = {{flexDirection : 'row',justifyContent: 'center', alignSelf: 'center', width: '80%', marginTop : '10%'}}>
            <KMainButton title = "     Back     " callback = {close_Register_Modal}/>
            <KMainButton title = "   Register   " callback = {onRegister} />
          </View>
        </View>) : null }


        { !RegisterVisible ?
        (<View style = {{flexDirection : 'column', justifyContent: 'center', marginTop: 20,  width : '80%', alignSelf: 'center'}}>
          <KMainButton title = "Watch" callback = {onWatch} />
          <KMainButton title = "Register" callback = {open_Register_Modal} />       
          <KMainButton title = "Exit" callback = {onExit} />
          {/* <Text style = {{ color : "#FFF", padding : 20 , alignSelf : 'center' }}>my Name = danevhome01@gmail.com</Text>          */}
        </View>) : null }
        
        <View></View>
      </ScrollView>
    </LinearGradient>
  );
};
export default Main_Screen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleText: {
    fontSize: 50,
    fontFamily: 'Rowdies-Light',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 20,
    margin:20,
    marginTop:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  regtext: {
    color: "darkblue",
    fontSize: 18,
    fontWeight: "normal",
    marginTop: 10,
    marginLeft:15,
    fontStyle: 'italic'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },

});
