import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps'
import { Button, Card } from 'react-native-material-design'

import { Router, Scene, Actions } from 'react-native-router-flux'

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

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: {},
      lat: this.props.lat,
      lon: this.props.lon
    };
    this.update = this.update.bind(this)
    setInterval(this.update, 60000)
  }

  update() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude, lon: position.coords.longitude});
        fetch("http://rallyserver.herokuapp.com/update_location", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.props.username,
            groupname: this.props.groupname,
            lat: this.state.lat,
            lon: this.state.lon
          })
        })
        .catch(e => console.warn(JSON.stringify(e)))
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    fetch("http://rallyserver.herokuapp.com/update_group", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupname: this.props.groupname
      })
    })
    .then(response => response._bodyInit)
    .then(users => this.setState({users: users}))
    .catch(e => console.warn("here", JSON.stringify(e)))
  }

 render() {
   return (
     <View style={styles.container}>
       <MapView
         style={styles.map}
         region={{
           latitude: this.state.lat,
           longitude: this.state.lon,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
       >
            <MapView.Marker
              coordinate={{latitude: this.state.lat, longitude: this.state.lon}}
              title={this.props.username}
              description="You are here."
              pinColor="ffff22"
            />
          {this.state.users.map(user => (
              <MapView.Marker
                coordinate={{latitude: user.lat, longitude: user.lon}}
                title={user.username}
                description={user.status}
              />
            ))}
       </MapView>
     </View>
   );
 }
}
