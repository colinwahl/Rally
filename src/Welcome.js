import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
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
  fontWeight: 'bold',
  color: '#e62739',
  fontSize: 100
 },
 subtitle: {

   color: '#6ed3cf'
 },
 triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderTopWidth: 45,
      borderRightWidth: 45,
      borderBottomWidth: 0,
      borderLeftWidth: 45,
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
    button1:{fontSize: 20, color: 'green',

    },

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
        <Text style={styles.subtitle}>What would you like to do?</Text>
        <Button style={styles.button1} text="Create a Group" raised={true} onPress={()=> Actions.createGroup()} />
        <Button style={styles.button1} text="Join a Group" raised={true} onPress={()=> Actions.joinGroup()} />
      </View>
      </View>
    )
  }
}
