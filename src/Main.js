import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';
import MapView from 'react-native-maps'
import { Button, Divider } from 'react-native-material-design'
import SideMenu from 'react-native-side-menu'


import { Router, Scene, Actions, Subheader } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    backgroundColor: '#e1e9f0'
  },
  map: {
    flex: 0.5,
    height: 300
  },
  listview: {
    flex: 0.5,
    height: 300,
    paddingTop: 20,
    paddingBottom: 20
  },
  username: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  bordered: {
    borderColor: '#6ed3cf',
    borderWidth: 5
  },
  menu: {
    padding: 10
  },
  panic: {
    color: '#e62739',
    fontWeight: 'bold'
  },
  name: {
    color: '#6ed3cf'
  }
})

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      users: {},
      lat: this.props.lat,
      lon: this.props.lon,
      panic: false,
      status: "",
      datasource: this.ds.cloneWithRows([])
    };
    this.update = this.update.bind(this)
    this.updateGroup = this.updateGroup.bind(this)
    setInterval(this.update, 60000)
    setInterval(this.updateGroup, 60000)
  }

  componentDidMount() {
    this.updateGroup()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.status !== nextState.status) {
      return false
    }
    return true
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
  }

  updateGroup() {
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
    .then(response => JSON.parse(response._bodyInit))
    .then(data => {
      var a = Object.keys(this.state.users).filter(user => this.state.users[user].status !== "" || this.state.users[user].panic).map(user => {
        return {
          username: user,
          status: this.state.users[user].status,
          panic: this.state.users[user].panic
        }
      })
      this.setState({users: data, datasource: this.ds.cloneWithRows(a)})
    })
    .catch(e => console.warn("here", JSON.stringify(e)))
    .done()
  }

  panic() {
    var p = this.state.panic
    this.setState({panic: !p})
    fetch("http://rallyserver.herokuapp.com/update_panic", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupname: this.props.groupname,
        username: this.props.username
      })
    })
  }

  updateStatus() {
    fetch("http://rallyserver.herokuapp.com/update_status", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupname: this.props.groupname,
        username: this.props.username,
        status: this.state.status
      })
    })
    .done()
  }

 render() {
   var menu = (
     <View style={styles.menu}>
        <Text>Need help? Let people know!</Text>
        <Button text={this.state.panic ? "I am ok!" : "Send Help!"} raised={true} onPress={()=> this.panic()} />
        <Divider />
        <TextInput placeholder="What's your status?" onChangeText={(event) => this.setState({status: event})} />
        <Button text="Update my status." raised={true} onPress={()=> this.updateStatus()} />
     </View>
   )

   return (
     <SideMenu menu={menu}>
     <View style={styles.container}>
       <View style={styles.bordered}>
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
              pinColor="#ffff22"
            />
          {Object.keys(this.state.users).map(user => {
            if (user !== this.props.username) {
                return (<MapView.Marker
                  coordinate={{latitude: this.state.users[user].lat, longitude: this.state.users[user].lon}}
                  title={user}
                  description={this.state.users[user].status}
                />)
              }
              }
            )}
       </MapView>
       </View>
       <View style={styles.listview}>
         <Text style={styles.username}>Status Feed</Text>
         <Divider />
         <ListView
           dataSource={this.state.datasource}
           renderRow={user => {
             if (user.panic) {
               return <View><Text style={styles.panic}>{user.username} needs help!</Text><Divider /></View>
             }
             return <View><Text style={styles.name}>{user.username}</Text><Text>{user.status}</Text><Divider /></View>
           }} />
       </View>
     </View>
   </SideMenu>

   );
 }
}
