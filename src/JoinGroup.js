import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert
} from 'react-native';
import MapView from 'react-native-maps'
import { Button, Card } from 'react-native-material-design'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default class JoinGroup extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.warn(JSON.stringify(position))
        this.setState({position: position});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 5000}
    );
  }

  constructor(props) {
    super(props)
    this.state = {username: "", groupname: "", position: {}}
  }

  sendData() {
    if (this.state.position == {}) {
      Alert.alert("Warning", "Please wait while we find you. Try again soon.")
    } else {
      fetch("http://rallyserver.herokuapp.com/join_group", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          groupname: this.state.groupname,
          lat: this.state.position.coords.latitude,
          lon: this.state.position.coords.longitude
        })
      })
      .then(response => {
        if (response.status === 401) {
          Alert.alert("Error", "That group name doesn't exist. Or the username is taken. Who knows!")
        } else if (response.status === 200) {
          Actions.main({groupname: this.state.groupname, lat: this.state.position.coords.latitude, lon: this.state.position.coords.longitude, username: this.state.username})
        }
      })
      .catch(e => {
        console.warn(e)
      })
    }
  }


  render() {
    return (
      <View>
        <TextInput placeholder="Enter the group name." onChangeText={(event) => this.setState({groupname: event})} />
        <TextInput placeholder="Enter a user name." onChangeText={(event) => this.setState({username: event})} />
        <Button text="Submit" raised={true} onPress={()=> this.sendData()} />
      </View>
    )
  }
}
