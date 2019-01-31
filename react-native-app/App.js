/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

type Props = {};
export default class App extends Component<Props> {

  render() {
    const fotos = [ {id: 1, usuario: 'tiagoamp'}, {id: 2, usuario: 'ozzy'}, {id: 3, usuario: 'max'} ];

    return (
      <FlatList style={styles.container} data={fotos} keyExtractor={item => item.id}
          renderItem={ ({item}) => 
              <View>
                <View style={styles.cabecalho} >
                  <Image source={require('./resources/img/reactnative.png')} style={styles.fotoDePerfil} />
                  <Text>{item.usuario}</Text>
                </View>
                <Image source={require('./resources/img/reactnative.png')} style={styles.foto} />
              </View>
          }
        />

      // <ScrollView style={{marginTop: 20}}>
      //   {fotos.map(foto =>
      //       <View key={foto.id}>
      //         <Text>{foto.usuario}</Text>
      //         <Image source={require('./resources/img/reactnative.png')} style={{width:width, height:width}} />
      //       </View>
      //   )}
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  cabecalho: {
    margin: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10, 
    borderRadius: 20, 
    width:40, height:40
  },
  foto: {
    width:width, 
    height:width
  }
})
