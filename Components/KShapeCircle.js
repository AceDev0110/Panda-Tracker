import React, { Component } from 'react';
import {  StyleSheet,  Text,  View,  TextInput,  TouchableOpacity } from 'react-native';

export default class KShapeCircle extends Component {
    render() {
        return (
            <Text style = {{
                backgroundColor : this.props.color,
                fontSize: 20,
                borderRadius: 10,
                width: 20,
                height: 20
            }}  ></Text>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
});