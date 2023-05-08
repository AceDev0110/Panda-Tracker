import React, {Component, useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { PermissionsAndroid ,  DeviceEventEmitter, NativeAppEventEmitter, Platform} from 'react-native';
import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import BackgroundTimer from 'react-native-background-timer';
// import GeoSpark from 'react-native-geospark'; 
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-simple-toast';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
import {firebaseDB} from './src/config';
//--------------------  Screen  ---------------------------
import Map_Screen from './Screens/Map_Screen';
import Main_Screen from './Screens/Main_Screen';

var namesRef = firebaseDB.ref('/users');
var locationsRef = firebaseDB.ref('/locations');

var cnttest = 0;
const Stack = createStackNavigator();

async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
}

let AddToFirebase = (latitude, longitude) => {
  var id = DeviceInfo.getUniqueId();
  var pname = "";

  var registered = false;
  namesRef.once('value', snapshot => {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      if(childData.DeviceId.toString() == DeviceInfo.getUniqueId().toString()){
        registered = true;
        pname = childData.Name.toString();
      }
    });
  }).then(() => {
    if(registered == true){
      var itemRef= firebaseDB.ref('/locations/' + id.toString());
      itemRef.set({
          latitude: latitude,
          longitude: longitude,
          name: pname,
          testcnt: cnttest,
      })
      .then(() => {
        console.log(cnttest++);
      });
    }
  }).catch(error => {
    Toast.log(error);
  }); 
}
function App() {  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    saveCurrentLocation();
    /*BackgroundTimer.runBackgroundTimer(() => { 
      saveCurrentLocation();
    }, 2000);*/

    BackgroundTimer.setInterval(() => {
      saveCurrentLocation();
    }, 2000);


    /*
    const watchId = Geolocation.watchPosition(
      position => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log(latitude);        
        console.log(longitude);

        AddToFirebase(latitude, longitude);
        // var id = DeviceInfo.getUniqueId();
        // var pname = "";
      },
      error => {
        console.log(error, 'coords')
      },
      {
        enableHighAccuracy: true,
        interval: 3000,
        fastestInterval: 2000,
        distanceFilter: 2
      }
    )
    return () => Geolocation.clearWatch(watchId)*/
    return () => {}
  },[]);

  const saveCurrentLocation = () => {

    requestPermissions();
    Geolocation.getCurrentPosition(
      (position) => {
          //console.log(position);
          AddToFirebase(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
          console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000 }
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="xMainScreen"  screenOptions={{headerShown: false}} >
        <Stack.Screen name="xMainScreen" component={Main_Screen} />
        <Stack.Screen name="xMapScreen" component={Map_Screen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;