import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid
} from 'react-native';
import MapView from 'react-native-maps'
import { Button, Card } from 'react-native-material-design'

import { Router, Scene, Actions } from 'react-native-router-flux'


import Main from "./Main"
import Welcome from "./Welcome"
import CreateGroup from "./CreateGroup"
import JoinGroup from "./JoinGroup"
import About from "./About"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="welcome" component={Welcome} initial={true} panHandlers={null} />
          <Scene key="createGroup" component={CreateGroup} />
          <Scene key="joinGroup" component={JoinGroup} />
        
          <Scene key="about" component={About}/>
          <Scene key="main" component={Main} panHandlers={null}  />
        </Scene>
      </Router>
    )
  }
}
