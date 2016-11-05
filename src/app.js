import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import { Button, Card } from 'react-native-material-design';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 title: {
  fontWeight: '500',
 },
});

module.exports = class App extends Component {
 render() {
   const { region } = this.props;
   console.log(region);

   return (
     <View style ={styles.container}>
       <Button value="NORMAL FLAT" raised={true} theme="dark" text="its working"/>
       <MapView
         style={styles.map}
         region={{
           latitude: 33.958520,
           longitude: -83.376199,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
       >
            <MapView.Marker
              coordinate={{latitude: 33.9520, longitude: -83.376199}}
              title={"Colin Wahl"}
              description={"TURN UP"}
            />

            <MapView.Marker
              coordinate={{latitude: 33.95220, longitude: -83.376199}}
              title={"Nic Burgess"}
              description={"Go DAWGS"}
            />
       </MapView>
       <GeolocationExample />
     </View>
   );
 }
}


class GeolocationExample extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    );
  }
}