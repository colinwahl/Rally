import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, Card } from 'react-native-material-design'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
 welcomeContainer: {
   flex: 1,
   alignItems: 'center'
 },
 title: {
  fontWeight: 'bold',
  color: 'red',
  fontSize: 100
 },
 subtitle: {
   color: 'black'
 }
});


export default class Welcome extends Component {

  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Rally</Text>
        <Text style={styles.subtitle}>What would you like to do?</Text>
        <Button text="Create a Group" raised={true} onPress={()=> Actions.createGroup()} />
        <Button text="Join a Group" raised={true} onPress={()=> Actions.joinGroup()} />
      </View>
    )
  }
}
