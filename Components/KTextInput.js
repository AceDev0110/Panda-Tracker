import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class KTextInput extends Component {
 
  render() {
    return (
        <TextInput
            placeholder = {this.props.placeholder}
            style={styles.textInput}
            onChangeText={this.props.onChangeText}
            // onChangeText={idValue => onChangeIdValue(idValue)}
            // value={idValue}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  
  textInput: {
    height: 45, 
    width: '100%',
    alignSelf : 'center',
    textAlign : 'center',
    
    color: "#415c19",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: 'normal',
    
    borderColor: '#415c19', 
    borderRadius: 15 , 
    borderWidth: 3 ,
    
    paddingLeft : 20, 
    paddingRight : 20, 
    paddingBottom:4,
    
    margin: 5,

    backgroundColor : 'rgba(255, 255, 255, 0.8)',
  },
});