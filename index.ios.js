/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import codePush from "react-native-code-push";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class CodePushExample extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE },
      (status) => {
          switch (status) {
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
              this.setState({status: 'Downloading'});
              break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
              this.setState({status: 'Installing'});
              break;
          }
      },
      ({ receivedBytes, totalBytes, }) => {
        this.setState({receivedBytes, totalBytes});
      }
   );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello from React Native!
        </Text>
        <Text style={styles.instructions}>
          {this.state.status}
        </Text>
        {this._renderProgress()}
      </View>
    );
  }

  _renderProgress() {
    if (this.state.status === 'Downloading') {
      let progress = 0;
      if (typeof this.state.receivedBytes === 'number' && this.state.totalBytes === 'number') {
        progress = Math.round(this.state.receivedBytes / this.state.totalBytes * 100);
      }

      return (
        <Text style={styles.instructions}>
          {progress}%
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CodePushExample', () => CodePushExample);
