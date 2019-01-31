/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

type Props = {};
export default class App extends Component<Props> {

  render() {
    const fotos = [ {id: 1, usuario: 'tiago'}, {id: 2, usuario: 'alberto'}, {id: 3, usuario: 'joao'} ];

    return (
      <View style={{marginTop: 20}}>
        {fotos.map(foto =>
            <View key={foto.id}>
              <Text>{foto.usuario}</Text>
              <Image source={require('./resources/img/reactnative.png')} style={{width:width, height:width}} />
            </View>
        )}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
