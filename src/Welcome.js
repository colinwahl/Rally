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
  fontStyle:'italic',
  fontWeight: 'bold',
  color: '#e62739',
  fontSize: 100
 },
 subtitle: {
   textAlign: 'center',
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
      flex:1,
      alignItems: 'center',
      backgroundColor: '#e1e8f0',
      justifyContent:'flex-start'
    },
    button1:{
      margin: 10,
      width:200
    },
    button2:{
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


export default class Welcome extends Component {

  render() {
    return (
    <View style={{flex:1}}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Rally</Text>
        <View style={styles.triangle}/>
      </View>

      <View style={styles.buttons}>
        <View style={styles.button1}>
        <Button style={styles.button2} theme="dark" text="Create a Group" raised={true} onPress={()=> Actions.createGroup()} />
        </View>
        <View style={styles.button1}>
        <Button style={styles.button1} theme="dark" text="Join a Group" raised={true} onPress={()=> Actions.joinGroup()} />
        </View>
        <View style={styles.button1}>
        <Text style={styles.subtitle} onPress={()=>Actions.about()}>About Us</Text>
        </View>
      </View>
    </View>
    )
  }
}
