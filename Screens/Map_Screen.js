/*This is an Example of React Native Map*/
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, StatusBar, Alert, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

import KButtonPink from '../Components/KButtonPink';
import KShapeCircle from '../Components/KShapeCircle';
import {firebaseDB} from '../src/config';

var tempMarkerPosition;
var cnt = 0;
var markerArray = [{
  "latitude": 0, 
  "longitude": 0 ,
  "name" : ""
}];
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var itemsRef = firebaseDB.ref('/locations');



var region = { latitude: 0, longitude: 0,  latitudeDelta: 0, longitudeDelta: 0 };
var regionInitialized = false;
function Map_Screen({navigation}) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    if(regionInitialized == false){

      Geolocation.getCurrentPosition((position) => {
        region = {
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta : 0.012 ,
          longitudeDelta : 0.012 * (screenWidth / screenHeight),
        };
        regionInitialized = true;

        console.log(region);
      })
    }

    const onValueChange = itemsRef.on('value', snapshot => {
      let lastLength = markerArray.length;
      markerArray = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        markerArray[markerArray.length] = {
          "latitude" : childData.latitude, 
          "longitude": childData.longitude, 
          "name" : childData.name
        };
      });
      setForceUpdate(forceUpdate + 1);      
    });

    return () => { itemsRef.off('value', onValueChange); }
  });
  
  const onRegionChange = (pregion) => {
    //console.log(pregion);
  }

  var pandaFindId = 0;
  const onFindPanda = () => {
    if(markerArray.length > 0){
      pandaFindId = pandaFindId % markerArray.length;

      
      setRegion({
        latitude: markerArray[pandaFindId].latitude,
        longitude: markerArray[pandaFindId].longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      })
      pandaFindId++;
      setForceUpdate(forceUpdate + 1);
      console.log(pandaFindId);
    }
  }

  var mapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },     { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },     { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },     { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },     { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },     { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },     { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },     { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },     { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },     { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },     { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },     { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },     { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },     { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },     { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },     { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },     { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },     { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }];
  return (
    <View style={styles.container}>
        <StatusBar hidden={true} />  
        { regionInitialized ? 
        (<MapView
          style={styles.map}
          initialRegion = {region}
          mapType = "satellite"
          customMapStyle={mapStyle}
          onRegionChangeComplete ={region => { onRegionChange(region); }}
        >

        {
          markerArray.map((item, key) => {
            return(
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title = {item.name}
                key = {key}>
              </Marker>
            );
          })
        }

        </MapView>) : null }
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',//use absolute position to show button on top of the map
            top: '86%', //for center align
            alignSelf: 'center' //for align to right
          }}
        >
        {/* <KButtonPink title="Find" callback={onFindPanda} /> */}

        </View>
      </View>
  )
}
export default Map_Screen;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});