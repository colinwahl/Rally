import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
//import {Shape}from 'react-art';
import { Button, Card } from 'react-native-material-design'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
 welcomeContainer: {
   flex:1,
   alignItems: 'center',
   backgroundColor: '#e1e8f0',
   justifyContent:'center'
 },
 title: {
   fontFamily: 'verdana',
   textDecorationLine: 'underline',
   fontWeight: 'bold',
   color: '#e62739',
   fontSize: 60
 },
 subtitle: {

   color: '#6ed3cf'
 },
 triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderTopWidth: 60,
      borderRightWidth: 60,
      borderBottomWidth: 0,
      borderLeftWidth: 60,
      borderTopColor: '#9068be',
      borderRightColor: 'transparent',
      borderBottomColor: 'red',
      borderLeftColor: 'transparent',
    },
    buttons:{
      flex:2,
      alignItems: 'center',
      backgroundColor: '#e1e8f0',
      justifyContent:'flex-start'
    },
    button1:{
      margin: 10,
      width:200
    },
    square:{
      width:50,
      height:50,
      backgroundColor:'red'
    },
    circle: {
      height: 30,
      width: 30,
      borderRadius: 30
    },
    shapes:{
      flex:1,
      alignItems: 'center',
      backgroundColor: '#e1e8f0',
      justifyContent:'center'
    }

});


export default class About extends Component {

  render() {
    return (
    <View style={{flex:1}}>
    <View style={styles.welcomeContainer}>
        <Text style={styles.title}>About Us</Text>
    </View>
    </View>
    )
  }
}
